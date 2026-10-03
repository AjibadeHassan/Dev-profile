import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { getUserIdFromRequest } from '@/lib/auth'
import { serializeUser } from '@/lib/serializers'

export async function GET(req: NextRequest) {
  const userId = getUserIdFromRequest(req)
  if (!userId) {
    return NextResponse.json({ detail: 'Unauthorized' }, { status: 401 })
  }

  const user = await db.user.findUnique({ where: { id: userId } })
  if (!user) {
    return NextResponse.json({ detail: 'User not found' }, { status: 404 })
  }

  return NextResponse.json(serializeUser(user))
}

export async function PUT(req: NextRequest) {
  const userId = getUserIdFromRequest(req)
  if (!userId) {
    return NextResponse.json({ detail: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await req.json()
    const { first_name, last_name, bio, phone_number } = body

    const updated = await db.user.update({
      where: { id: userId },
      data: {
        ...(first_name !== undefined && { firstName: first_name }),
        ...(last_name !== undefined && { lastName: last_name }),
        ...(bio !== undefined && { bio }),
        ...(phone_number !== undefined && { phoneNumber: phone_number }),
      },
    })

    return NextResponse.json(serializeUser(updated))
  } catch (error: any) {
    return NextResponse.json(
      { detail: error.message || 'Failed to update profile' },
      { status: 500 }
    )
  }
}
