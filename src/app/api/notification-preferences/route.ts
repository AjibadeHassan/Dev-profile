import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { getUserIdFromRequest } from '@/lib/auth'

export async function GET(req: NextRequest) {
  const userId = getUserIdFromRequest(req)
  if (!userId) {
    return NextResponse.json({ detail: 'Unauthorized' }, { status: 401 })
  }

  const prefs = await db.notificationPreference.upsert({
    where: { userId },
    update: {},
    create: { userId },
  })

  return NextResponse.json({
    emailNotifications: prefs.emailNotifications,
    pushNotifications: prefs.pushNotifications,
    smsNotifications: prefs.smsNotifications,
    appointmentReminder: prefs.appointmentReminder,
    prescriptionReady: prefs.prescriptionReady,
    medicalRecordUpdate: prefs.medicalRecordUpdate,
    systemAlerts: prefs.systemAlerts,
    reminderHoursBefore: prefs.reminderHoursBefore,
  })
}

export async function PUT(req: NextRequest) {
  const userId = getUserIdFromRequest(req)
  if (!userId) {
    return NextResponse.json({ detail: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await req.json()
    const {
      emailNotifications,
      pushNotifications,
      smsNotifications,
      appointmentReminder,
      prescriptionReady,
      medicalRecordUpdate,
      systemAlerts,
      reminderHoursBefore,
    } = body

    const prefs = await db.notificationPreference.upsert({
      where: { userId },
      update: {
        ...(emailNotifications !== undefined && { emailNotifications: !!emailNotifications }),
        ...(pushNotifications !== undefined && { pushNotifications: !!pushNotifications }),
        ...(smsNotifications !== undefined && { smsNotifications: !!smsNotifications }),
        ...(appointmentReminder !== undefined && { appointmentReminder: !!appointmentReminder }),
        ...(prescriptionReady !== undefined && { prescriptionReady: !!prescriptionReady }),
        ...(medicalRecordUpdate !== undefined && { medicalRecordUpdate: !!medicalRecordUpdate }),
        ...(systemAlerts !== undefined && { systemAlerts: !!systemAlerts }),
        ...(reminderHoursBefore !== undefined && { reminderHoursBefore: Number(reminderHoursBefore) }),
      },
      create: { userId },
    })

    return NextResponse.json({
      emailNotifications: prefs.emailNotifications,
      pushNotifications: prefs.pushNotifications,
      smsNotifications: prefs.smsNotifications,
      appointmentReminder: prefs.appointmentReminder,
      prescriptionReady: prefs.prescriptionReady,
      medicalRecordUpdate: prefs.medicalRecordUpdate,
      systemAlerts: prefs.systemAlerts,
      reminderHoursBefore: prefs.reminderHoursBefore,
    })
  } catch (error: any) {
    return NextResponse.json(
      { detail: error.message || 'Failed to update preferences' },
      { status: 500 }
    )
  }
}
