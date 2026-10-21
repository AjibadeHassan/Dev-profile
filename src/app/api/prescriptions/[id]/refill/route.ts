import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { getUserIdFromRequest } from '@/lib/auth'
import { serializePrescription } from '@/lib/serializers'

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const userId = getUserIdFromRequest(req)
  if (!userId) {
    return NextResponse.json({ detail: 'Unauthorized' }, { status: 401 })
  }

  const { id } = await params
  const prescription = await db.prescription.findUnique({ where: { id } })
  if (!prescription) {
    return NextResponse.json({ detail: 'Prescription not found' }, { status: 404 })
  }

  if (prescription.patientId !== userId) {
    return NextResponse.json({ detail: 'Forbidden' }, { status: 403 })
  }

  if (prescription.refillsRemaining <= 0) {
    return NextResponse.json(
      { detail: 'No refills remaining for this prescription' },
      { status: 400 }
    )
  }

  const updated = await db.prescription.update({
    where: { id },
    data: {
      refillsRemaining: prescription.refillsRemaining - 1,
      status: 'refilled',
    },
  })

  return NextResponse.json(await serializePrescription(updated))
}
