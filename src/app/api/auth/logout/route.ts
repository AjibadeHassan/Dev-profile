import { NextResponse } from 'next/server'

export async function POST() {
  // Stateless JWT: client just discards the token
  return NextResponse.json({ message: 'Logged out successfully' })
}
