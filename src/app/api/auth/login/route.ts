import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { verifyPassword, generateToken } from '@/lib/auth'
import { serializeUser } from '@/lib/serializers'

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json()

    if (!email || !password) {
      return NextResponse.json(
        { detail: 'Email and password are required' },
        { status: 400 }
      )
    }

    const user = await db.user.findUnique({ where: { email } })
    if (!user) {
      return NextResponse.json(
        { detail: 'Invalid email or password' },
        { status: 401 }
      )
    }

    if (!verifyPassword(password, user.password)) {
      return NextResponse.json(
        { detail: 'Invalid email or password' },
        { status: 401 }
      )
    }

    if (!user.isActive) {
      return NextResponse.json(
        { detail: 'Account is deactivated. Please contact support.' },
        { status: 403 }
      )
    }

    const token = generateToken(user.id)

    // Update last login / create notification preference if missing
    await db.notificationPreference.upsert({
      where: { userId: user.id },
      update: {},
      create: { userId: user.id },
    })

    return NextResponse.json({
      token,
      user: serializeUser(user),
    })
  } catch (error: any) {
    return NextResponse.json(
      { detail: error.message || 'Login failed' },
      { status: 500 }
    )
  }
}
