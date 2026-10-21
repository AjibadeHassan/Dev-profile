import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { getUserIdFromRequest } from '@/lib/auth'

export async function GET(req: NextRequest) {
  const userId = getUserIdFromRequest(req)
  if (!userId) {
    return NextResponse.json({ detail: 'Unauthorized' }, { status: 401 })
  }

  const doctors = await db.user.findMany({
    where: { role: 'doctor', isActive: true },
    orderBy: { firstName: 'asc' },
  })

  return NextResponse.json(
    doctors.map((d) => ({
      id: d.id,
      firstName: d.firstName,
      lastName: d.lastName,
      email: d.email,
      specialization: d.specialization,
    }))
  )
}
