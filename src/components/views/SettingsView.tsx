'use client'

import { useEffect, useState } from 'react'
import { useRouterStore } from '@/store/router'
import { useAuthStore } from '@/store/auth'
import api from '@/lib/api'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Separator } from '@/components/ui/separator'
import { Alert, AlertDescription } from '@/components/ui/alert'
import {
  AlertCircle,
  CheckCircle2,
  Mail,
  Smartphone,
  MessageSquare,
  Bell,
  Activity,
  FileText,
  AlertTriangle,
  Loader2,
  Calendar,
} from 'lucide-react'

interface Preferences {
  emailNotifications: boolean
  pushNotifications: boolean
  smsNotifications: boolean
  appointmentReminder: boolean
  prescriptionReady: boolean
  medicalRecordUpdate: boolean
  systemAlerts: boolean
  reminderHoursBefore: number
}

const defaultPrefs: Preferences = {
  emailNotifications: true,
  pushNotifications: true,
  smsNotifications: false,
  appointmentReminder: true,
  prescriptionReady: true,
  medicalRecordUpdate: true,
  systemAlerts: true,
  reminderHoursBefore: 24,
}

export default function SettingsView() {
  const { navigate } = useRouterStore()
  const { user } = useAuthStore()
  const [prefs, setPrefs] = useState<Preferences>(defaultPrefs)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState<'success' | 'error'>('success')

  useEffect(() => {
    if (!user) {
      navigate('login')
      return
    }
    fetchPreferences()
  }, [user])

  const fetchPreferences = async () => {
    try {
      const res = await api.get<Preferences>('/notification-preferences')
      setPrefs({ ...defaultPrefs, ...res })
    } catch {
      // use defaults
    } finally {
      setLoading(false)
    }
  }

  const handleToggle = (key: keyof Preferences) => {
    setPrefs((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  const handleSave = async () => {
    setSaving(true)
    setMessage('')
    try {
      await api.put('/notification-preferences', prefs)
      setMessageType('success')
      setMessage('Preferences saved successfully!')
      setTimeout(() => setMessage(''), 3000)
    } catch (err: any) {
      setMessageType('error')
      setMessage(err.message || 'Failed to save preferences')
    } finally {
      setSaving(false)
    }
  }

  const deliveryChannels = [
    { key: 'emailNotifications' as const, label: 'Email Notifications', desc: 'Receive notifications via email', icon: Mail },
    { key: 'pushNotifications' as const, label: 'Push Notifications', desc: 'Receive push notifications in browser', icon: Bell },
    { key: 'smsNotifications' as const, label: 'SMS Notifications', desc: 'Receive notifications via SMS', icon: Smartphone },
  ]

  const notificationTypes = [
    { key: 'appointmentReminder' as const, label: 'Appointment Reminders', desc: 'Get reminded before appointments', icon: Calendar },
    { key: 'prescriptionReady' as const, label: 'Prescription Ready', desc: 'When a prescription is ready', icon: Activity },
    { key: 'medicalRecordUpdate' as const, label: 'Medical Record Updates', desc: 'When records are added or updated', icon: FileText },
    { key: 'systemAlerts' as const, label: 'System Alerts', desc: 'Important system announcements', icon: AlertTriangle },
  ]

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="animate-pulse space-y-4">
          <div className="h-8 w-48 bg-muted rounded" />
          <div className="h-64 bg-muted rounded" />
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground mt-1">
          Manage your notification preferences
        </p>
      </div>

      {message && (
        <Alert
          className={`mb-6 ${
            messageType === 'success'
              ? 'border-emerald-200 bg-emerald-50 text-emerald-800'
              : ''
          }`}
        >
          {messageType === 'success' ? (
            <CheckCircle2 className="h-4 w-4 text-emerald-600" />
          ) : (
            <AlertCircle className="h-4 w-4" />
          )}
          <AlertDescription>{message}</AlertDescription>
        </Alert>
      )}

      {/* Delivery Channels */}
      <Card className="border-0 shadow-sm mb-6">
        <CardHeader>
          <CardTitle className="text-lg">Delivery Channels</CardTitle>
          <CardDescription>Choose how you want to be notified</CardDescription>
        </CardHeader>
        <CardContent className="space-y-1">
          {deliveryChannels.map((channel, idx) => {
            const Icon = channel.icon
            return (
              <div key={channel.key}>
                {idx > 0 && <Separator className="my-1" />}
                <div className="flex items-center justify-between py-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50">
                      <Icon className="h-4 w-4 text-emerald-600" />
                    </div>
                    <div>
                      <Label className="font-medium cursor-pointer">{channel.label}</Label>
                      <p className="text-xs text-muted-foreground">{channel.desc}</p>
                    </div>
                  </div>
                  <Switch
                    checked={prefs[channel.key] as boolean}
                    onCheckedChange={() => handleToggle(channel.key)}
                  />
                </div>
              </div>
            )
          })}
        </CardContent>
      </Card>

      {/* Notification Types */}
      <Card className="border-0 shadow-sm mb-6">
        <CardHeader>
          <CardTitle className="text-lg">Notification Types</CardTitle>
          <CardDescription>Select which events trigger notifications</CardDescription>
        </CardHeader>
        <CardContent className="space-y-1">
          {notificationTypes.map((type, idx) => {
            const Icon = type.icon
            return (
              <div key={type.key}>
                {idx > 0 && <Separator className="my-1" />}
                <div className="flex items-center justify-between py-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal-50">
                      <Icon className="h-4 w-4 text-teal-600" />
                    </div>
                    <div>
                      <Label className="font-medium cursor-pointer">{type.label}</Label>
                      <p className="text-xs text-muted-foreground">{type.desc}</p>
                    </div>
                  </div>
                  <Switch
                    checked={prefs[type.key] as boolean}
                    onCheckedChange={() => handleToggle(type.key)}
                  />
                </div>
              </div>
            )
          })}
        </CardContent>
      </Card>

      {/* Reminder Timing */}
      <Card className="border-0 shadow-sm mb-6">
        <CardHeader>
          <CardTitle className="text-lg">Reminder Timing</CardTitle>
          <CardDescription>When to send appointment reminders</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label htmlFor="reminderHoursBefore">Hours before appointment</Label>
            <Input
              id="reminderHoursBefore"
              type="number"
              min="1"
              max="168"
              value={prefs.reminderHoursBefore}
              onChange={(e) =>
                setPrefs((prev) => ({
                  ...prev,
                  reminderHoursBefore: parseInt(e.target.value) || 24,
                }))
              }
            />
            <p className="text-xs text-muted-foreground">
              You will receive a reminder {prefs.reminderHoursBefore} hour(s) before each appointment.
            </p>
          </div>
        </CardContent>
      </Card>

      <Button
        onClick={handleSave}
        className="bg-emerald-600 hover:bg-emerald-700"
        disabled={saving}
      >
        {saving ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : null}
        {saving ? 'Saving...' : 'Save Preferences'}
      </Button>
    </div>
  )
}
