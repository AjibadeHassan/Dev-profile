'use client'

import { useEffect, useState } from 'react'
import { useRouterStore } from '@/store/router'
import { useAuthStore } from '@/store/auth'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import api from '@/lib/api'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Alert, AlertDescription } from '@/components/ui/alert'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Skeleton } from '@/components/ui/skeleton'
import { ArrowLeft, AlertCircle, Calendar, Stethoscope, Building2, Loader2 } from 'lucide-react'

const schema = z.object({
  doctor: z.string().min(1, 'Please select a doctor'),
  department: z.string().min(1, 'Please select a department'),
  appointmentDate: z.string().min(1, 'Please select a date'),
  appointmentTime: z.string().min(1, 'Please select a time slot'),
  reason: z.string().min(10, 'Reason must be at least 10 characters'),
  notes: z.string().optional(),
})

type FormData = z.infer<typeof schema>

interface Doctor {
  id: string
  firstName: string
  lastName: string
  specialization: string
}

interface Department {
  id: string
  name: string
}

interface Slot {
  time: string
  available: boolean
}

export default function BookAppointmentView() {
  const { navigate } = useRouterStore()
  const { user } = useAuthStore()
  const [doctors, setDoctors] = useState<Doctor[]>([])
  const [departments, setDepartments] = useState<Department[]>([])
  const [slots, setSlots] = useState<Slot[]>([])
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedDoctor, setSelectedDoctor] = useState('')
  const [loadingData, setLoadingData] = useState(true)
  const [loadingSlots, setLoadingSlots] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  useEffect(() => {
    if (!user) {
      navigate('login')
      return
    }
    fetchInitialData()
  }, [user])

  const fetchInitialData = async () => {
    try {
      setLoadingData(true)
      const [doctorsRes, departmentsRes] = await Promise.all([
        api.get<Doctor[]>('/doctors'),
        api.get<Department[]>('/departments'),
      ])
      setDoctors(doctorsRes)
      setDepartments(departmentsRes)
    } catch (err: any) {
      setError(err.message || 'Failed to load doctors and departments')
    } finally {
      setLoadingData(false)
    }
  }

  const fetchSlots = async (doctorId: string, date: string) => {
    try {
      setLoadingSlots(true)
      setSlots([])
      const res = await api.get<{ slots: Slot[] }>(
        `/appointments/slots?doctor_id=${doctorId}&date=${date}`
      )
      setSlots(res.slots || [])
    } catch {
      setSlots([])
    } finally {
      setLoadingSlots(false)
    }
  }

  const handleDateChange = (date: string) => {
    setSelectedDate(date)
    setValue('appointmentDate', date)
    if (date && selectedDoctor) {
      fetchSlots(selectedDoctor, date)
    }
  }

  const handleDoctorChange = (doctorId: string) => {
    setSelectedDoctor(doctorId)
    setValue('doctor', doctorId)
    if (doctorId && selectedDate) {
      fetchSlots(doctorId, selectedDate)
    }
  }

  const onSubmit = async (data: FormData) => {
    setSubmitting(true)
    setError('')
    try {
      const dateTime = new Date(`${data.appointmentDate}T${convertTimeTo24(data.appointmentTime)}`)
      await api.post('/appointments', {
        doctor: data.doctor,
        department: data.department,
        appointment_date: dateTime.toISOString(),
        reason: data.reason,
        notes: data.notes || '',
      })
      navigate('appointments')
    } catch (err: any) {
      setError(err.message || 'Failed to book appointment')
    } finally {
      setSubmitting(false)
    }
  }

  // Convert "09:00 AM" to "09:00:00"
  const convertTimeTo24 = (time: string) => {
    const match = time.match(/(\d+):(\d+)\s*(AM|PM)/i)
    if (!match) return '09:00'
    let h = parseInt(match[1])
    const m = match[2]
    const ampm = match[3].toUpperCase()
    if (ampm === 'PM' && h !== 12) h += 12
    if (ampm === 'AM' && h === 12) h = 0
    return `${String(h).padStart(2, '0')}:${m}:00`
  }

  const today = new Date().toISOString().split('T')[0]

  if (loadingData) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <Skeleton className="h-10 w-64 mb-6" />
        <Skeleton className="h-96" />
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <button
        onClick={() => navigate('appointments')}
        className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to appointments
      </button>

      <h1 className="text-3xl font-bold mb-6">Book an Appointment</h1>

      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Card className="border-0 shadow-sm">
        <CardContent className="p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="department">Department</Label>
              <Select onValueChange={(v) => setValue('department', v)}>
                <SelectTrigger id="department" className="w-full">
                  <div className="flex items-center gap-2">
                    <Building2 className="h-4 w-4 text-muted-foreground" />
                    <SelectValue placeholder="Select a department" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  {departments.map((d) => (
                    <SelectItem key={d.id} value={d.id}>
                      {d.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.department && (
                <p className="text-xs text-red-500">{errors.department.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="doctor">Doctor</Label>
              <Select
                onValueChange={handleDoctorChange}
                value={selectedDoctor}
              >
                <SelectTrigger id="doctor" className="w-full">
                  <div className="flex items-center gap-2">
                    <Stethoscope className="h-4 w-4 text-muted-foreground" />
                    <SelectValue placeholder="Select a doctor" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  {doctors.map((d) => (
                    <SelectItem key={d.id} value={d.id}>
                      Dr. {d.firstName} {d.lastName}
                      {d.specialization ? ` — ${d.specialization}` : ''}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.doctor && (
                <p className="text-xs text-red-500">{errors.doctor.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="appointmentDate">Appointment Date</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                <Input
                  id="appointmentDate"
                  type="date"
                  min={today}
                  className="pl-9"
                  value={selectedDate}
                  onChange={(e) => handleDateChange(e.target.value)}
                />
              </div>
              {errors.appointmentDate && (
                <p className="text-xs text-red-500">{errors.appointmentDate.message}</p>
              )}
            </div>

            {loadingSlots && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" />
                Loading available time slots...
              </div>
            )}

            {!loadingSlots && slots.length > 0 && (
              <div className="space-y-2">
                <Label>Available Time Slots</Label>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                  {slots.map((slot, idx) => (
                    <button
                      key={idx}
                      type="button"
                      disabled={!slot.available}
                      onClick={() => {
                        setValue('appointmentTime', slot.time)
                      }}
                      className={`px-3 py-2 rounded-md text-sm font-medium transition-colors border ${
                        !slot.available
                          ? 'bg-muted text-muted-foreground/50 cursor-not-allowed border-muted'
                          : watch('appointmentTime') === slot.time
                          ? 'bg-emerald-600 text-white border-emerald-600'
                          : 'bg-background hover:bg-emerald-50 hover:border-emerald-300 border-border'
                      }`}
                    >
                      {slot.time}
                    </button>
                  ))}
                </div>
                {errors.appointmentTime && (
                  <p className="text-xs text-red-500">{errors.appointmentTime.message}</p>
                )}
              </div>
            )}

            {!loadingSlots && selectedDate && selectedDoctor && slots.length === 0 && (
              <div className="text-sm text-muted-foreground p-3 rounded-md bg-muted/50">
                No available slots for the selected date. Please pick another date.
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="reason">Reason for Visit</Label>
              <Textarea
                id="reason"
                placeholder="Describe your symptoms or reason for appointment"
                rows={3}
                {...register('reason')}
              />
              {errors.reason && (
                <p className="text-xs text-red-500">{errors.reason.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Additional Notes (Optional)</Label>
              <Textarea
                id="notes"
                placeholder="Any additional information the doctor should know"
                rows={2}
                {...register('notes')}
              />
            </div>

            <div className="flex gap-2 pt-2">
              <Button
                type="submit"
                className="bg-emerald-600 hover:bg-emerald-700 flex-1"
                disabled={submitting}
              >
                {submitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Booking...
                  </>
                ) : (
                  'Book Appointment'
                )}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('appointments')}
              >
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
