import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { getUserIdFromRequest } from '@/lib/auth'
import { serializeMedicalRecordAsync } from '@/lib/serializers'

export async function GET(req: NextRequest) {
  const userId = getUserIdFromRequest(req)
  if (!userId) {
    return NextResponse.json({ detail: 'Unauthorized' }, { status: 401 })
  }

  const user = await db.user.findUnique({ where: { id: userId } })
  if (!user) {
    return NextResponse.json({ detail: 'User not found' }, { status: 404 })
  }

  // Patients see their own records; doctors see records they created
  const where = user.role === 'doctor' ? { doctorId: userId } : { patientId: userId }

  const records = await db.medicalRecord.findMany({
    where,
    orderBy: { recordDate: 'desc' },
  })

  const serialized = await Promise.all(records.map(serializeMedicalRecordAsync))
  return NextResponse.json(serialized)
}

export async function POST(req: NextRequest) {
  const userId = getUserIdFromRequest(req)
  if (!userId) {
    return NextResponse.json({ detail: 'Unauthorized' }, { status: 401 })
  }

  const user = await db.user.findUnique({ where: { id: userId } })
  if (!user || (user.role !== 'doctor' && user.role !== 'admin')) {
    return NextResponse.json(
      { detail: 'Only doctors can create medical records' },
      { status: 403 }
    )
  }

  try {
    const body = await req.json()
    const {
      patient_id,
      record_type,
      title,
      description,
      findings,
      recommendations,
      record_date,
    } = body

    if (!patient_id || !title || !description || !record_date) {
      return NextResponse.json(
        { detail: 'Patient, title, description, and date are required' },
        { status: 400 }
      )
    }

    const record = await db.medicalRecord.create({
      data: {
        patientId: patient_id,
        doctorId: userId,
        recordType: record_type || 'diagnosis',
        title,
        description,
        findings: findings || '',
        recommendations: recommendations || '',
        recordDate: new Date(record_date),
        isVerified: true,
      },
    })

    // Notify the patient
    await db.notification.create({
      data: {
        userId: patient_id,
        notificationType: 'medical_record',
        title: 'New Medical Record',
        message: `Dr. ${user.firstName} ${user.lastName} added a new medical record: ${title}`,
        relatedObjectUrl: '',
      },
    })

    return NextResponse.json(await serializeMedicalRecordAsync(record))
  } catch (error: any) {
    return NextResponse.json(
      { detail: error.message || 'Failed to create medical record' },
      { status: 500 }
    )
  }
}
