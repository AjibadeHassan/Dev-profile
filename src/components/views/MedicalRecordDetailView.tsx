'use client'

import { useEffect, useState } from 'react'
import { useRouterStore } from '@/store/router'
import api from '@/lib/api'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { ArrowLeft, AlertCircle, FileCheck, Mail, Calendar, User, Download } from 'lucide-react'

interface MedicalRecord {
  id: string
  patientName: string
  doctorName: string
  doctorEmail: string
  recordType: string
  title: string
  description: string
  findings: string
  recommendations: string
  recordDate: string
  fileUrl: string
  isVerified: boolean
  createdAt: string
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

export default function MedicalRecordDetailView() {
  const { navigate, params } = useRouterStore()
  const recordId = params.id
  const [record, setRecord] = useState<MedicalRecord | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!recordId) {
      navigate('medical-records')
      return
    }
    fetchRecord()
  }, [recordId])

  const fetchRecord = async () => {
    try {
      setLoading(true)
      const res = await api.get<MedicalRecord>(`/medical-records/${recordId}`)
      setRecord(res)
    } catch (err: any) {
      setError(err.message || 'Failed to fetch record')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Skeleton className="h-8 w-40 mb-6" />
        <Skeleton className="h-96" />
      </div>
    )
  }

  if (error || !record) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error || 'Record not found'}</AlertDescription>
        </Alert>
        <Button variant="outline" onClick={() => navigate('medical-records')} className="mt-4">
          Go Back
        </Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Button
        variant="ghost"
        onClick={() => navigate('medical-records')}
        className="mb-6"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Records
      </Button>

      <Card className="border-0 shadow-sm">
        <CardContent className="p-6 md:p-8">
          {/* Header */}
          <div className="border-b pb-6 mb-6">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold mb-2">{record.title}</h1>
                <p className="text-muted-foreground">Dr. {record.doctorName}</p>
                <p className="text-sm text-muted-foreground mt-1">{record.doctorEmail}</p>
              </div>
              <div className="flex flex-col items-start sm:items-end gap-2">
                <Badge
                  variant="outline"
                  className={`${typeColors[record.recordType] || typeColors.other} capitalize`}
                >
                  {record.recordType.replace('_', ' ')}
                </Badge>
                {record.isVerified && (
                  <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">
                    <FileCheck className="mr-1 h-3 w-3" />
                    Verified
                  </Badge>
                )}
              </div>
            </div>
          </div>

          {/* Key Information */}
          <div className="grid grid-cols-2 gap-4 mb-6 pb-6 border-b">
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Record Date</p>
              <p className="font-semibold flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                {new Date(record.recordDate).toLocaleDateString(undefined, { dateStyle: 'long' })}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Patient</p>
              <p className="font-semibold flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                {record.patientName}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Created</p>
              <p className="font-semibold">{new Date(record.createdAt).toLocaleDateString()}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Status</p>
              <p className="font-semibold">
                {record.isVerified ? 'Verified' : 'Pending Verification'}
              </p>
            </div>
          </div>

          {/* Content Sections */}
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold mb-2">Description</h2>
              <p className="text-muted-foreground leading-relaxed">{record.description}</p>
            </div>

            {record.findings && (
              <div>
                <h2 className="text-lg font-semibold mb-2">Findings</h2>
                <p className="text-muted-foreground leading-relaxed">{record.findings}</p>
              </div>
            )}

            {record.recommendations && (
              <div className="p-4 rounded-lg bg-emerald-50 border border-emerald-100">
                <h2 className="text-lg font-semibold mb-2 text-emerald-900">Recommendations</h2>
                <p className="text-emerald-800 leading-relaxed">{record.recommendations}</p>
              </div>
            )}

            {record.fileUrl && (
              <div className="p-4 rounded-lg bg-muted/50 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Attached File</p>
                  <p className="text-xs text-muted-foreground">{record.fileUrl}</p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.open(record.fileUrl, '_blank')}
                >
                  <Download className="mr-1 h-4 w-4" />
                  Download
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
