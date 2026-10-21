'use client'

import { useEffect, useState } from 'react'
import { useRouterStore } from '@/store/router'
import { useAuthStore } from '@/store/auth'
import api from '@/lib/api'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { Alert, AlertDescription } from '@/components/ui/alert'
import {
  Users,
  Calendar,
  CalendarCheck,
  FileText,
  ArrowRight,
  AlertCircle,
  Clock,
} from 'lucide-react'

export default function DoctorDashboardView() {
  const { navigate } = useRouterStore()
  const { user } = useAuthStore()
  const [stats, setStats] = useState({
    totalPatients: 0,
    totalAppointments: 0,
    appointmentsToday: 0,
    pendingAppointments: 0,
  })
  const [todayAppointments, setTodayAppointments] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!user) {
      navigate('login')
      return
    }
    if (user.role !== 'doctor') {
      navigate('dashboard')
      return
    }
    fetchDashboardData()
  }, [user])

  const fetchDashboardData = async () => {
    try {
      setLoading(true)
      const appointments = await api.get<any[]>('/appointments')

      const today = new Date().toDateString()
      const todayApts = appointments.filter(
        (a) => new Date(a.appointmentDate).toDateString() === today
      )

      const uniquePatients = new Set(appointments.map((a) => a.patientId))

      setStats({
        totalPatients: uniquePatients.size,
        totalAppointments: appointments.length,
        appointmentsToday: todayApts.length,
        pendingAppointments: appointments.filter((a) => a.status === 'scheduled').length,
      })
      setTodayAppointments(
        todayApts
          .sort((a, b) => new Date(a.appointmentDate).getTime() - new Date(b.appointmentDate).getTime())
          .slice(0, 6)
      )
    } catch (err: any) {
      setError(err.message || 'Failed to fetch dashboard data')
    } finally {
      setLoading(false)
    }
  }

  const statCards = [
    {
      label: 'Total Patients',
      value: stats.totalPatients,
      icon: Users,
      color: 'text-emerald-600',
      bg: 'bg-emerald-50',
    },
    {
      label: 'Total Appointments',
      value: stats.totalAppointments,
      sub: `${stats.pendingAppointments} pending`,
      icon: Calendar,
      color: 'text-cyan-600',
      bg: 'bg-cyan-50',
    },
    {
      label: "Today's Appointments",
      value: stats.appointmentsToday,
      icon: CalendarCheck,
      color: 'text-teal-600',
      bg: 'bg-teal-50',
    },
    {
      label: 'Records Created',
      value: 0,
      icon: FileText,
      color: 'text-amber-600',
      bg: 'bg-amber-50',
    },
  ]

  const quickActions = [
    { label: 'View Appointments', icon: Calendar, view: 'appointments' as const, primary: true },
    { label: 'Medical Records', icon: FileText, view: 'medical-records' as const },
    { label: 'Prescriptions', icon: CalendarCheck, view: 'prescriptions' as const },
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
          Welcome, Dr. {user?.lastName}!
        </h1>
        <p className="text-muted-foreground mt-1">
          Manage your patients and appointments
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
                    {stat.sub && <p className="text-xs text-muted-foreground mt-1">{stat.sub}</p>}
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
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

      {/* Today's Appointments */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Today&apos;s Schedule</h2>
          <Button variant="ghost" size="sm" onClick={() => navigate('appointments')}>
            View all
            <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </div>

        {todayAppointments.length === 0 ? (
          <Card className="border-dashed">
            <CardContent className="p-8 text-center">
              <Calendar className="mx-auto h-10 w-10 text-muted-foreground mb-3" />
              <p className="text-muted-foreground">No appointments scheduled for today</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3">
            {todayAppointments.map((apt) => (
              <Card key={apt.id} className="border-0 shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold">{apt.patientName}</h3>
                      <p className="text-sm text-muted-foreground mt-0.5 line-clamp-1">
                        {apt.reason}
                      </p>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground mt-2">
                        <Clock className="h-3 w-3" />
                        {new Date(apt.appointmentDate).toLocaleTimeString(undefined, {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                        <span className="mx-1">•</span>
                        {apt.departmentName}
                      </div>
                    </div>
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
