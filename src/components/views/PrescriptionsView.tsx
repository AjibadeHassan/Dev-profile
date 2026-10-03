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
import { Activity, AlertCircle, Loader2, RefreshCw, ArrowRight, Pill } from 'lucide-react'

interface Prescription {
  id: string
  patientName: string
  doctorName: string
  medicineName: string
  genericName: string
  strength: string
  form: string
  dosage: string
  frequency: string
  duration: string
  instructions: string
  quantity: number
  refills: number
  refillsRemaining: number
  status: string
  isActive: boolean
  prescriptionDate: string
}

const statusColors: Record<string, string> = {
  active: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  dispensed: 'bg-teal-50 text-teal-700 border-teal-200',
  refilled: 'bg-cyan-50 text-cyan-700 border-cyan-200',
  expired: 'bg-red-50 text-red-700 border-red-200',
  cancelled: 'bg-muted text-muted-foreground border-border',
}

export default function PrescriptionsView() {
  const { navigate } = useRouterStore()
  const { user } = useAuthStore()
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [filter, setFilter] = useState<'active' | 'dispensed' | 'all'>('active')
  const [refillingId, setRefillingId] = useState<string | null>(null)

  useEffect(() => {
    if (!user) {
      navigate('login')
      return
    }
    fetchPrescriptions()
  }, [user])

  const fetchPrescriptions = async () => {
    try {
      setLoading(true)
      const res = await api.get<Prescription[]>('/prescriptions')
      setPrescriptions(res)
    } catch (err: any) {
      setError(err.message || 'Failed to fetch prescriptions')
    } finally {
      setLoading(false)
    }
  }

  const handleRefill = async (id: string) => {
    try {
      setRefillingId(id)
      await api.post(`/prescriptions/${id}/refill`)
      await fetchPrescriptions()
    } catch (err: any) {
      setError(err.message || 'Failed to refill prescription')
    } finally {
      setRefillingId(null)
    }
  }

  const filtered = prescriptions.filter((p) => {
    if (filter === 'active') return p.isActive
    if (filter === 'dispensed') return p.status === 'dispensed'
    return true
  })

  const filters = [
    { key: 'active' as const, label: 'Active' },
    { key: 'dispensed' as const, label: 'Dispensed' },
    { key: 'all' as const, label: 'All' },
  ]

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <Skeleton className="h-10 w-64 mb-6" />
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-40" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Prescriptions</h1>
        <p className="text-muted-foreground mt-1">
          {user?.role === 'doctor' ? 'Prescriptions you have issued' : 'Your medication history'}
        </p>
      </div>

      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="flex gap-2 mb-6">
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
            <Pill className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No prescriptions found</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {filtered.map((p) => (
            <Card
              key={p.id}
              className="border-0 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => navigate('prescription-detail', { id: p.id })}
            >
              <CardContent className="p-5">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50 flex-shrink-0">
                        <Pill className="h-5 w-5 text-emerald-600" />
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-semibold text-lg truncate">{p.medicineName}</h3>
                        <p className="text-sm text-muted-foreground">
                          {p.genericName && `${p.genericName} • `}{p.strength} • {p.form}
                        </p>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                      Prescribed by Dr. {p.doctorName}
                    </p>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 p-3 rounded-md bg-muted/50">
                      <div>
                        <p className="text-xs text-muted-foreground">Dosage</p>
                        <p className="text-sm font-medium">{p.dosage}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Frequency</p>
                        <p className="text-sm font-medium">{p.frequency}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Duration</p>
                        <p className="text-sm font-medium">{p.duration}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Refills</p>
                        <p className="text-sm font-medium">
                          {p.refillsRemaining}/{p.refills}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex sm:flex-col items-center sm:items-end gap-2 flex-shrink-0">
                    <Badge
                      variant="outline"
                      className={`${statusColors[p.status] || statusColors.cancelled} capitalize`}
                    >
                      {p.status}
                    </Badge>
                    {p.refillsRemaining > 0 && p.isActive && user?.role !== 'doctor' && (
                      <Button
                        variant="outline"
                        size="sm"
                        disabled={refillingId === p.id}
                        onClick={(e) => {
                          e.stopPropagation()
                          handleRefill(p.id)
                        }}
                        className="border-emerald-200 text-emerald-700 hover:bg-emerald-50"
                      >
                        {refillingId === p.id ? (
                          <Loader2 className="mr-1 h-3 w-3 animate-spin" />
                        ) : (
                          <RefreshCw className="mr-1 h-3 w-3" />
                        )}
                        Refill
                      </Button>
                    )}
                    <ArrowRight className="h-4 w-4 text-muted-foreground hidden sm:block" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
