import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { getUserIdFromRequest } from '@/lib/auth'
import { serializeAppointment } from '@/lib/serializers'

export async function GET(req: NextRequest) {
  const userId = getUserIdFromRequest(req)
  if (!userId) {
    return NextResponse.json({ detail: 'Unauthorized' }, { status: 401 })
  }

  const user = await db.user.findUnique({ where: { id: userId } })
  if (!user) {
    return NextResponse.json({ detail: 'User not found' }, { status: 404 })
  }

  // Patients see their own appointments; doctors see theirs
  const where = user.role === 'doctor' ? { doctorId: userId } : { patientId: userId }

  const appointments = await db.appointment.findMany({
    where,
    orderBy: { appointmentDate: 'desc' },
  })

  const serialized = await Promise.all(appointments.map(serializeAppointment))
  return NextResponse.json(serialized)
}

export async function POST(req: NextRequest) {
  const userId = getUserIdFromRequest(req)
  if (!userId) {
    return NextResponse.json({ detail: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await req.json()
    const { doctor, department, appointment_date, reason, notes } = body

    if (!doctor || !appointment_date || !reason) {
      return NextResponse.json(
        { detail: 'Doctor, date, and reason are required' },
        { status: 400 }
      )
    }

    // Verify doctor exists
    const doctorUser = await db.user.findFirst({
      where: { id: doctor, role: 'doctor' },
    })
    if (!doctorUser) {
      return NextResponse.json({ detail: 'Invalid doctor' }, { status: 400 })
    }

    const appointment = await db.appointment.create({
      data: {
        patientId: userId,
        doctorId: doctor,
        departmentId: department || null,
        appointmentDate: new Date(appointment_date),
        reason,
        notes: notes || '',
        status: 'scheduled',
      },
    })

    // Create a notification for the doctor
    const patient = await db.user.findUnique({ where: { id: userId } })
    await db.notification.create({
      data: {
        userId: doctor,
        notificationType: 'appointment',
        title: 'New Appointment Booked',
        message: `${patient?.firstName} ${patient?.lastName} booked an appointment for ${new Date(appointment_date).toLocaleString()}.`,
        relatedObjectUrl: '',
      },
    })

    // Create a notification for the patient
    await db.notification.create({
      data: {
        userId,
        notificationType: 'appointment',
        title: 'Appointment Confirmed',
        message: `Your appointment with Dr. ${doctorUser.firstName} ${doctorUser.lastName} on ${new Date(appointment_date).toLocaleString()} has been scheduled.`,
        relatedObjectUrl: '',
      },
    })

    return NextResponse.json(await serializeAppointment(appointment))
  } catch (error: any) {
    return NextResponse.json(
      { detail: error.message || 'Failed to create appointment' },
      { status: 500 }
    )
  }
}
