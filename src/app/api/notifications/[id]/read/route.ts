import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { getUserIdFromRequest } from '@/lib/auth'
import { serializeNotification } from '@/lib/serializers'

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const userId = getUserIdFromRequest(req)
  if (!userId) {
    return NextResponse.json({ detail: 'Unauthorized' }, { status: 401 })
  }

  const { id } = await params
  const notification = await db.notification.findUnique({ where: { id } })
  if (!notification || notification.userId !== userId) {
    return NextResponse.json({ detail: 'Notification not found' }, { status: 404 })
  }

  const updated = await db.notification.update({
    where: { id },
    data: { isRead: true },
  })

  return NextResponse.json(serializeNotification(updated))
}
