import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { hashPassword, generateToken } from '@/lib/auth'
import { serializeUser } from '@/lib/serializers'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const {
      first_name,
      last_name,
      email,
      username,
      password,
      password_confirm,
      role,
    } = body

    // Validation
    if (!first_name || !last_name || !email || !username || !password) {
      return NextResponse.json(
        { detail: 'All required fields must be provided' },
        { status: 400 }
      )
    }

    if (password !== password_confirm) {
      return NextResponse.json(
        { detail: 'Passwords do not match' },
        { status: 400 }
      )
    }

    if (password.length < 6) {
      return NextResponse.json(
        { detail: 'Password must be at least 6 characters' },
        { status: 400 }
      )
    }

    const validRoles = ['patient', 'doctor', 'nurse', 'admin', 'pharmacist']
    const finalRole = validRoles.includes(role) ? role : 'patient'

    const existing = await db.user.findFirst({
      where: { OR: [{ email }, { username }] },
    })
    if (existing) {
      return NextResponse.json(
        { detail: 'User with this email or username already exists' },
        { status: 400 }
      )
    }

    const user = await db.user.create({
      data: {
        username,
        email,
        password: hashPassword(password),
        firstName: first_name,
        lastName: last_name,
        role: finalRole,
      },
    })

    await db.notificationPreference.create({
      data: { userId: user.id },
    })

    const token = generateToken(user.id)

    return NextResponse.json({
      token,
      user: serializeUser(user),
      message: 'Registration successful',
    })
  } catch (error: any) {
    return NextResponse.json(
      { detail: error.message || 'Registration failed' },
      { status: 500 }
    )
  }
}
