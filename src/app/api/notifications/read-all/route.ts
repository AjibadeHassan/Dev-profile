import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { getUserIdFromRequest } from '@/lib/auth'

export async function POST(req: NextRequest) {
  const userId = getUserIdFromRequest(req)
  if (!userId) {
    return NextResponse.json({ detail: 'Unauthorized' }, { status: 401 })
  }

  await db.notification.updateMany({
    where: { userId, isRead: false },
    data: { isRead: true },
  })

  return NextResponse.json({ message: 'All notifications marked as read' })
}
