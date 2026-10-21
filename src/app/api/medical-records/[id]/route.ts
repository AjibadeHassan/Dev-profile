import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { getUserIdFromRequest } from '@/lib/auth'
import { serializeMedicalRecordAsync } from '@/lib/serializers'

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const userId = getUserIdFromRequest(req)
  if (!userId) {
    return NextResponse.json({ detail: 'Unauthorized' }, { status: 401 })
  }

  const { id } = await params
  const record = await db.medicalRecord.findUnique({ where: { id } })
  if (!record) {
    return NextResponse.json({ detail: 'Record not found' }, { status: 404 })
  }

  if (record.patientId !== userId && record.doctorId !== userId) {
    return NextResponse.json({ detail: 'Forbidden' }, { status: 403 })
  }

  return NextResponse.json(await serializeMedicalRecordAsync(record))
}
