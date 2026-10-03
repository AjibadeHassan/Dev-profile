'use client'

import { useEffect, useState } from 'react'
import { useRouterStore } from '@/store/router'
import { useAuthStore } from '@/store/auth'
import api from '@/lib/api'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { Alert, AlertDescription } from '@/components/ui/alert'
import {
  Calendar,
  CalendarPlus,
  Clock,
  Mail,
  AlertCircle,
  X,
  Loader2,
} from 'lucide-react'

interface Appointment {
  id: string
  patientName: string
  doctorName: string
  doctorEmail: string
  departmentName: string
  appointmentDate: string
  reason: string
  status: string
  notes: string
}

const statusColors: Record<string, string> = {
  scheduled: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  completed: 'bg-teal-50 text-teal-700 border-teal-200',
  cancelled: 'bg-red-50 text-red-700 border-red-200',
  no_show: 'bg-amber-50 text-amber-700 border-amber-200',
}

export default function AppointmentsView() {
  const { navigate } = useRouterStore()
  const { user } = useAuthStore()
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [cancellingId, setCancellingId] = useState<string | null>(null)
  const [filter, setFilter] = useState<'all' | 'scheduled' | 'completed' | 'cancelled'>('all')

  useEffect(() => {
    if (!user) {
      navigate('login')
      return
    }
    fetchAppointments()
  }, [user])

  const fetchAppointments = async () => {
    try {
      setLoading(true)
      const res = await api.get<Appointment[]>('/appointments')
      setAppointments(res)
    } catch (err: any) {
      setError(err.message || 'Failed to fetch appointments')
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = async (id: string) => {
    if (!confirm('Are you sure you want to cancel this appointment?')) return
    try {
      setCancellingId(id)
      await api.delete(`/appointments/${id}`)
      setAppointments((prev) =>
        prev.map((a) => (a.id === id ? { ...a, status: 'cancelled' } : a))
      )
    } catch (err: any) {
      setError(err.message || 'Failed to cancel appointment')
    } finally {
      setCancellingId(null)
    }
  }

  const filtered = appointments.filter((a) => {
    if (filter === 'all') return true
    return a.status === filter
  })

  const filters = [
    { key: 'all' as const, label: 'All' },
    { key: 'scheduled' as const, label: 'Scheduled' },
    { key: 'completed' as const, label: 'Completed' },
    { key: 'cancelled' as const, label: 'Cancelled' },
  ]

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <Skeleton className="h-10 w-64 mb-6" />
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-32" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold">Appointments</h1>
          <p className="text-muted-foreground mt-1">
            Manage your {user?.role === 'doctor' ? 'patient' : ''} appointments
          </p>
        </div>
        {user?.role !== 'doctor' && (
          <Button
            onClick={() => navigate('appointments-book')}
            className="bg-emerald-600 hover:bg-emerald-700"
          >
            <CalendarPlus className="mr-2 h-4 w-4" />
            Book New
          </Button>
        )}
      </div>

      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Filters */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {filters.map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
              filter === f.key
                ? 'bg-emerald-600 text-white'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="p-12 text-center">
            <Calendar className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground mb-4">No appointments found</p>
            {user?.role !== 'doctor' && (
              <Button
                onClick={() => navigate('appointments-book')}
                className="bg-emerald-600 hover:bg-emerald-700"
              >
                <CalendarPlus className="mr-2 h-4 w-4" />
                Book Your First Appointment
              </Button>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {filtered.map((apt) => (
            <Card key={apt.id} className="border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-5">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-lg">
                        {user?.role === 'doctor' ? apt.patientName : `Dr. ${apt.doctorName}`}
                      </h3>
                      <Badge
                        variant="outline"
                        className={`${statusColors[apt.status] || ''} capitalize`}
                      >
                        {apt.status.replace('_', ' ')}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{apt.departmentName}</p>

                    <div className="space-y-1.5 text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Clock className="h-4 w-4 flex-shrink-0" />
                        {new Date(apt.appointmentDate).toLocaleString(undefined, {
                          dateStyle: 'long',
                          timeStyle: 'short',
                        })}
                      </div>
                      {user?.role !== 'doctor' && (
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Mail className="h-4 w-4 flex-shrink-0" />
                          {apt.doctorEmail}
                        </div>
                      )}
                    </div>

                    <div className="mt-3 p-3 rounded-md bg-muted/50">
                      <p className="text-xs font-medium text-muted-foreground uppercase mb-1">Reason</p>
                      <p className="text-sm">{apt.reason}</p>
                      {apt.notes && (
                        <>
                          <p className="text-xs font-medium text-muted-foreground uppercase mt-2 mb-1">Notes</p>
                          <p className="text-sm text-muted-foreground">{apt.notes}</p>
                        </>
                      )}
                    </div>
                  </div>

                  {apt.status === 'scheduled' && user?.role !== 'doctor' && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleCancel(apt.id)}
                      disabled={cancellingId === apt.id}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
                    >
                      {cancellingId === apt.id ? (
                        <Loader2 className="mr-1 h-3 w-3 animate-spin" />
                      ) : (
                        <X className="mr-1 h-3 w-3" />
                      )}
                      Cancel
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
