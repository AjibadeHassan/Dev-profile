import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json()
    if (!email) {
      return NextResponse.json(
        { detail: 'Email is required' },
        { status: 400 }
      )
    }

    const user = await db.user.findUnique({ where: { email } })
    // Always return success to prevent email enumeration
    return NextResponse.json({
      message: user
        ? 'Password reset link has been sent to your email.'
        : 'If an account exists with that email, a reset link has been sent.',
    })
  } catch (error: any) {
    return NextResponse.json(
      { detail: error.message || 'Failed to send reset link' },
      { status: 500 }
    )
  }
}
