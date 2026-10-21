import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { getUserIdFromRequest } from '@/lib/auth'
import { serializePrescription } from '@/lib/serializers'

export async function GET(req: NextRequest) {
  const userId = getUserIdFromRequest(req)
  if (!userId) {
    return NextResponse.json({ detail: 'Unauthorized' }, { status: 401 })
  }

  const user = await db.user.findUnique({ where: { id: userId } })
  if (!user) {
    return NextResponse.json({ detail: 'User not found' }, { status: 404 })
  }

  const where = user.role === 'doctor' ? { doctorId: userId } : { patientId: userId }

  const prescriptions = await db.prescription.findMany({
    where,
    orderBy: { prescriptionDate: 'desc' },
  })

  const serialized = await Promise.all(prescriptions.map(serializePrescription))
  return NextResponse.json(serialized)
}
