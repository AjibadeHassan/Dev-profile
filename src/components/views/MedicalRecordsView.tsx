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
import { FileText, AlertCircle, FileCheck, ArrowRight, Search } from 'lucide-react'
import { Input } from '@/components/ui/input'

interface MedicalRecord {
  id: string
  patientName: string
  doctorName: string
  recordType: string
  title: string
  description: string
  recordDate: string
  isVerified: boolean
}

const typeColors: Record<string, string> = {
  diagnosis: 'bg-red-50 text-red-700 border-red-200',
  treatment: 'bg-teal-50 text-teal-700 border-teal-200',
  lab_result: 'bg-cyan-50 text-cyan-700 border-cyan-200',
  imaging: 'bg-purple-50 text-purple-700 border-purple-200',
  vaccination: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  surgery: 'bg-amber-50 text-amber-700 border-amber-200',
  other: 'bg-muted text-muted-foreground border-border',
}

export default function MedicalRecordsView() {
  const { navigate } = useRouterStore()
  const { user } = useAuthStore()
  const [records, setRecords] = useState<MedicalRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [filter, setFilter] = useState<'all' | 'verified' | string>('all')
  const [search, setSearch] = useState('')

  useEffect(() => {
    if (!user) {
      navigate('login')
      return
    }
    fetchRecords()
  }, [user])

  const fetchRecords = async () => {
    try {
      setLoading(true)
      const res = await api.get<MedicalRecord[]>('/medical-records')
      setRecords(res)
    } catch (err: any) {
      setError(err.message || 'Failed to fetch medical records')
    } finally {
      setLoading(false)
    }
  }

  const filtered = records.filter((r) => {
    const matchesFilter =
      filter === 'all' ||
      (filter === 'verified' && r.isVerified) ||
      r.recordType === filter
    const matchesSearch =
      !search ||
      r.title.toLowerCase().includes(search.toLowerCase()) ||
      r.description.toLowerCase().includes(search.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const filterOptions = [
    { key: 'all', label: 'All Records' },
    { key: 'verified', label: 'Verified Only' },
    { key: 'diagnosis', label: 'Diagnoses' },
    { key: 'lab_result', label: 'Lab Results' },
    { key: 'imaging', label: 'Imaging' },
    { key: 'vaccination', label: 'Vaccinations' },
  ]

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <Skeleton className="h-10 w-64 mb-6" />
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-28" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Medical Records</h1>
        <p className="text-muted-foreground mt-1">
          {user?.role === 'doctor' ? 'Records you have created' : 'Your complete medical history'}
        </p>
      </div>

      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Search */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search records by title or description..."
          className="pl-9"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Filters */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {filterOptions.map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
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
            <FileText className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No medical records found</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {filtered.map((record) => (
            <Card
              key={record.id}
              className="border-0 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => navigate('medical-record-detail', { id: record.id })}
            >
              <CardContent className="p-5">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <h3 className="font-semibold text-lg">{record.title}</h3>
                      {record.isVerified && (
                        <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">
                          <FileCheck className="mr-1 h-3 w-3" />
                          Verified
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      {user?.role === 'doctor' ? record.patientName : `Dr. ${record.doctorName}`}
                    </p>
                    <p className="text-sm line-clamp-2 text-muted-foreground">
                      {record.description}
                    </p>
                    <p className="text-xs text-muted-foreground mt-2">
                      {new Date(record.recordDate).toLocaleDateString(undefined, {
                        dateStyle: 'long',
                      })}
                    </p>
                  </div>
                  <div className="flex sm:flex-col items-center sm:items-end gap-2">
                    <Badge
                      variant="outline"
                      className={`${typeColors[record.recordType] || typeColors.other} capitalize`}
                    >
                      {record.recordType.replace('_', ' ')}
                    </Badge>
                    <ArrowRight className="h-4 w-4 text-muted-foreground" />
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
