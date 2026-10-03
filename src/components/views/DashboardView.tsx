'use client'

import { useEffect, useState } from 'react'
import { useRouterStore } from '@/store/router'
import { useAuthStore } from '@/store/auth'
import api from '@/lib/api'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import {
  Calendar,
  Activity,
  FileText,
  Bell,
  CalendarPlus,
  ArrowRight,
  Clock,
  AlertCircle,
} from 'lucide-react'

interface Appointment {
  id: string
  doctorName: string
  appointmentDate: string
  reason: string
  status: string
}

export default function DashboardView() {
  const { navigate } = useRouterStore()
  const { user } = useAuthStore()
  const [stats, setStats] = useState({
    totalAppointments: 0,
    upcomingAppointments: 0,
    totalPrescriptions: 0,
    activePrescriptions: 0,
    totalMedicalRecords: 0,
    unreadNotifications: 0,
  })
  const [upcoming, setUpcoming] = useState<Appointment[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!user) {
      navigate('login')
      return
    }
    if (user.role === 'doctor') {
      navigate('doctor-dashboard')
      return
    }
    fetchDashboardData()
  }, [user])

  const fetchDashboardData = async () => {
    try {
      setLoading(true)
      const [appointmentsRes, prescriptionsRes, recordsRes, notificationsRes] = await Promise.all([
        api.get<any[]>('/appointments'),
        api.get<any[]>('/prescriptions'),
        api.get<any[]>('/medical-records'),
        api.get<{ unread_count: number }>('/notifications/unread-count'),
      ])

      const appointments = appointmentsRes || []
      const prescriptions = prescriptionsRes || []
      const records = recordsRes || []

      setStats({
        totalAppointments: appointments.length,
        upcomingAppointments: appointments.filter((a) => a.status === 'scheduled').length,
        totalPrescriptions: prescriptions.length,
        activePrescriptions: prescriptions.filter((p) => p.isActive).length,
        totalMedicalRecords: records.length,
        unreadNotifications: notificationsRes.unread_count,
      })

      const up = appointments
        .filter((a) => a.status === 'scheduled')
        .sort((a, b) => new Date(a.appointmentDate).getTime() - new Date(b.appointmentDate).getTime())
        .slice(0, 5)
      setUpcoming(up)
    } catch (err: any) {
      setError(err.message || 'Failed to fetch dashboard data')
    } finally {
      setLoading(false)
    }
  }

  const statCards = [
    {
      label: 'Total Appointments',
      value: stats.totalAppointments,
      sub: `${stats.upcomingAppointments} upcoming`,
      icon: Calendar,
      color: 'text-emerald-600',
      bg: 'bg-emerald-50',
    },
    {
      label: 'Prescriptions',
      value: stats.totalPrescriptions,
      sub: `${stats.activePrescriptions} active`,
      icon: Activity,
      color: 'text-teal-600',
      bg: 'bg-teal-50',
    },
    {
      label: 'Medical Records',
      value: stats.totalMedicalRecords,
      sub: 'On file',
      icon: FileText,
      color: 'text-cyan-600',
      bg: 'bg-cyan-50',
    },
    {
      label: 'Notifications',
      value: stats.unreadNotifications,
      sub: 'Unread',
      icon: Bell,
      color: 'text-amber-600',
      bg: 'bg-amber-50',
    },
  ]

  const quickActions = [
    { label: 'Book Appointment', icon: CalendarPlus, view: 'appointments-book' as const, primary: true },
    { label: 'View Appointments', icon: Calendar, view: 'appointments' as const },
    { label: 'View Prescriptions', icon: Activity, view: 'prescriptions' as const },
    { label: 'Medical Records', icon: FileText, view: 'medical-records' as const },
  ]

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Skeleton className="h-10 w-64 mb-8" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-28" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          Welcome back, {user?.firstName}!
        </h1>
        <p className="text-muted-foreground mt-1">
          Here&apos;s an overview of your health activity
        </p>
      </div>

      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statCards.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.label} className="border-0 shadow-sm">
              <CardContent className="p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                      {stat.label}
                    </p>
                    <p className="text-3xl font-bold mt-2">{stat.value}</p>
                    <p className="text-xs text-muted-foreground mt-1">{stat.sub}</p>
                  </div>
                  <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${stat.bg}`}>
                    <Icon className={`h-5 w-5 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {quickActions.map((action) => {
            const Icon = action.icon
            return (
              <Button
                key={action.label}
                variant={action.primary ? 'default' : 'outline'}
                onClick={() => navigate(action.view)}
                className={
                  action.primary
                    ? 'h-auto py-4 bg-emerald-600 hover:bg-emerald-700 justify-start'
                    : 'h-auto py-4 justify-start'
                }
              >
                <Icon className="mr-2 h-5 w-5" />
                {action.label}
              </Button>
            )
          })}
        </div>
      </div>

      {/* Upcoming Appointments */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Upcoming Appointments</h2>
          <Button variant="ghost" size="sm" onClick={() => navigate('appointments')}>
            View all
            <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </div>

        {upcoming.length === 0 ? (
          <Card className="border-dashed">
            <CardContent className="p-8 text-center">
              <Calendar className="mx-auto h-10 w-10 text-muted-foreground mb-3" />
              <p className="text-muted-foreground mb-4">No upcoming appointments</p>
              <Button
                onClick={() => navigate('appointments-book')}
                className="bg-emerald-600 hover:bg-emerald-700"
              >
                <CalendarPlus className="mr-2 h-4 w-4" />
                Book an Appointment
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3">
            {upcoming.map((apt) => (
              <Card key={apt.id} className="border-0 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold truncate">Dr. {apt.doctorName}</h3>
                      <p className="text-sm text-muted-foreground mt-0.5 line-clamp-1">
                        {apt.reason}
                      </p>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground mt-2">
                        <Clock className="h-3 w-3" />
                        {new Date(apt.appointmentDate).toLocaleString(undefined, {
                          dateStyle: 'medium',
                          timeStyle: 'short',
                        })}
                      </div>
                    </div>
                    <Badge
                      variant="secondary"
                      className="bg-emerald-50 text-emerald-700 capitalize"
                    >
                      {apt.status}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
