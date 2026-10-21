import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { getUserIdFromRequest } from '@/lib/auth'
import { serializeAppointment } from '@/lib/serializers'

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const userId = getUserIdFromRequest(req)
  if (!userId) {
    return NextResponse.json({ detail: 'Unauthorized' }, { status: 401 })
  }

  const { id } = await params
  const appointment = await db.appointment.findUnique({ where: { id } })
  if (!appointment) {
    return NextResponse.json({ detail: 'Appointment not found' }, { status: 404 })
  }

  // Only the patient or doctor involved can view
  if (appointment.patientId !== userId && appointment.doctorId !== userId) {
    return NextResponse.json({ detail: 'Forbidden' }, { status: 403 })
  }

  return NextResponse.json(await serializeAppointment(appointment))
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const userId = getUserIdFromRequest(req)
  if (!userId) {
    return NextResponse.json({ detail: 'Unauthorized' }, { status: 401 })
  }

  const { id } = await params
  const appointment = await db.appointment.findUnique({ where: { id } })
  if (!appointment) {
    return NextResponse.json({ detail: 'Appointment not found' }, { status: 404 })
  }

  if (appointment.patientId !== userId && appointment.doctorId !== userId) {
    return NextResponse.json({ detail: 'Forbidden' }, { status: 403 })
  }

  try {
    const body = await req.json()
    const { status, appointment_date, reason, notes } = body

    const updated = await db.appointment.update({
      where: { id },
      data: {
        ...(status && { status }),
        ...(appointment_date && { appointmentDate: new Date(appointment_date) }),
        ...(reason && { reason }),
        ...(notes !== undefined && { notes }),
      },
    })

    return NextResponse.json(await serializeAppointment(updated))
  } catch (error: any) {
    return NextResponse.json(
      { detail: error.message || 'Failed to update appointment' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const userId = getUserIdFromRequest(req)
  if (!userId) {
    return NextResponse.json({ detail: 'Unauthorized' }, { status: 401 })
  }

  const { id } = await params
  const appointment = await db.appointment.findUnique({ where: { id } })
  if (!appointment) {
    return NextResponse.json({ detail: 'Appointment not found' }, { status: 404 })
  }

  if (appointment.patientId !== userId && appointment.doctorId !== userId) {
    return NextResponse.json({ detail: 'Forbidden' }, { status: 403 })
  }

  // Soft-cancel instead of delete
  const updated = await db.appointment.update({
    where: { id },
    data: { status: 'cancelled' },
  })

  return NextResponse.json(await serializeAppointment(updated))
}
