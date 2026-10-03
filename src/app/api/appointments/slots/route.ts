import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { getUserIdFromRequest } from '@/lib/auth'

export async function GET(req: NextRequest) {
  const userId = getUserIdFromRequest(req)
  if (!userId) {
    return NextResponse.json({ detail: 'Unauthorized' }, { status: 401 })
  }

  const { searchParams } = new URL(req.url)
  const doctorId = searchParams.get('doctor_id')
  const dateStr = searchParams.get('date')

  if (!doctorId || !dateStr) {
    return NextResponse.json(
      { detail: 'doctor_id and date are required' },
      { status: 400 }
    )
  }

  const date = new Date(dateStr)
  const dayStart = new Date(date)
  dayStart.setHours(0, 0, 0, 0)
  const dayEnd = new Date(date)
  dayEnd.setHours(23, 59, 59, 999)

  // Find existing appointments for that doctor on that date
  const existing = await db.appointment.findMany({
    where: {
      doctorId,
      appointmentDate: { gte: dayStart, lte: dayEnd },
      status: { not: 'cancelled' },
    },
    select: { appointmentDate: true },
  })

  const bookedTimes = new Set(
    existing.map((a) => a.appointmentDate.getTime())
  )

  // Generate slots from 9 AM to 5 PM, every 30 min
  const slots: { time: string; available: boolean }[] = []
  for (let h = 9; h < 17; h++) {
    for (const m of [0, 30]) {
      const slotDate = new Date(date)
      slotDate.setHours(h, m, 0, 0)
      const now = new Date()
      slots.push({
        time: slotDate.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
        }),
        available:
          slotDate.getTime() > now.getTime() &&
          !bookedTimes.has(slotDate.getTime()),
      })
    }
  }

  return NextResponse.json({ slots })
}
