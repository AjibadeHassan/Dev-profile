import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { getUserIdFromRequest } from '@/lib/auth'

export async function GET(req: NextRequest) {
  const userId = getUserIdFromRequest(req)
  if (!userId) {
    return NextResponse.json({ detail: 'Unauthorized' }, { status: 401 })
  }

  const departments = await db.department.findMany({
    orderBy: { name: 'asc' },
  })

  return NextResponse.json(
    departments.map((d) => ({
      id: d.id,
      name: d.name,
      description: d.description,
    }))
  )
}
