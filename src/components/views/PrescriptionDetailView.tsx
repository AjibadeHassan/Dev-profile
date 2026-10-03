'use client'

import { useEffect, useState } from 'react'
import { useRouterStore } from '@/store/router'
import api from '@/lib/api'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { ArrowLeft, AlertCircle, Pill, Loader2, RefreshCw, Calendar, Building2 } from 'lucide-react'

interface Prescription {
  id: string
  patientName: string
  doctorName: string
  doctorEmail: string
  medicineName: string
  genericName: string
  strength: string
  form: string
  manufacturer: string
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

export default function PrescriptionDetailView() {
  const { navigate, params } = useRouterStore()
  const prescriptionId = params.id
  const [prescription, setPrescription] = useState<Prescription | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [refilling, setRefilling] = useState(false)

  useEffect(() => {
    if (!prescriptionId) {
      navigate('prescriptions')
      return
    }
    fetchPrescription()
  }, [prescriptionId])

  const fetchPrescription = async () => {
    try {
      setLoading(true)
      const res = await api.get<Prescription>(`/prescriptions/${prescriptionId}`)
      setPrescription(res)
    } catch (err: any) {
      setError(err.message || 'Failed to fetch prescription')
    } finally {
      setLoading(false)
    }
  }

  const handleRefill = async () => {
    if (!prescription) return
    try {
      setRefilling(true)
      await api.post(`/prescriptions/${prescription.id}/refill`)
      await fetchPrescription()
    } catch (err: any) {
      setError(err.message || 'Failed to refill prescription')
    } finally {
      setRefilling(false)
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

  if (error || !prescription) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error || 'Prescription not found'}</AlertDescription>
        </Alert>
        <Button variant="outline" onClick={() => navigate('prescriptions')} className="mt-4">
          Go Back
        </Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Button
        variant="ghost"
        onClick={() => navigate('prescriptions')}
        className="mb-6"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Prescriptions
      </Button>

      <Card className="border-0 shadow-sm">
        <CardContent className="p-6 md:p-8">
          {/* Header */}
          <div className="border-b pb-6 mb-6">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-50 flex-shrink-0">
                  <Pill className="h-6 w-6 text-emerald-600" />
                </div>
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold">{prescription.medicineName}</h1>
                  {prescription.genericName && (
                    <p className="text-muted-foreground">Generic: {prescription.genericName}</p>
                  )}
                  <p className="text-sm text-muted-foreground mt-1">Dr. {prescription.doctorName}</p>
                </div>
              </div>
              <Badge
                variant="outline"
                className={
                  prescription.isActive
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200 capitalize'
                    : 'bg-muted text-muted-foreground border-border capitalize'
                }
              >
                {prescription.status}
              </Badge>
            </div>
          </div>

          {/* Medicine Details */}
          <div className="grid grid-cols-2 gap-4 mb-6 pb-6 border-b">
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Strength</p>
              <p className="font-semibold">{prescription.strength}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Form</p>
              <p className="font-semibold capitalize">{prescription.form}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Manufacturer</p>
              <p className="font-semibold flex items-center gap-2">
                <Building2 className="h-4 w-4 text-muted-foreground" />
                {prescription.manufacturer || 'N/A'}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Quantity</p>
              <p className="font-semibold">{prescription.quantity}</p>
            </div>
          </div>

          {/* Dosage Information */}
          <div className="bg-emerald-50 p-5 rounded-lg mb-6 border border-emerald-100">
            <h2 className="text-lg font-semibold mb-4 text-emerald-900">Dosage Instructions</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-emerald-700">Dosage</p>
                <p className="font-semibold text-lg">{prescription.dosage}</p>
              </div>
              <div>
                <p className="text-xs text-emerald-700">Frequency</p>
                <p className="font-semibold text-lg">{prescription.frequency}</p>
              </div>
              <div>
                <p className="text-xs text-emerald-700">Duration</p>
                <p className="font-semibold text-lg">{prescription.duration}</p>
              </div>
              <div>
                <p className="text-xs text-emerald-700">Prescribed Date</p>
                <p className="font-semibold text-lg flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  {new Date(prescription.prescriptionDate).toLocaleDateString()}
                </p>
              </div>
            </div>
            {prescription.instructions && (
              <div className="mt-4">
                <p className="text-xs text-emerald-700 mb-1">Instructions</p>
                <p className="text-emerald-800 leading-relaxed">{prescription.instructions}</p>
              </div>
            )}
          </div>

          {/* Refill Information */}
          <div className="grid grid-cols-2 gap-4 mb-6 pb-6 border-b">
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Refills Remaining</p>
              <p className="text-2xl font-bold text-emerald-600">
                {prescription.refillsRemaining} <span className="text-base text-muted-foreground font-normal">of {prescription.refills}</span>
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Status</p>
              <p className={`text-2xl font-bold ${prescription.isActive ? 'text-emerald-600' : 'text-red-600'}`}>
                {prescription.isActive ? 'Active' : 'Inactive'}
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            {prescription.refillsRemaining > 0 && prescription.isActive && (
              <Button
                onClick={handleRefill}
                disabled={refilling}
                className="bg-emerald-600 hover:bg-emerald-700"
              >
                {refilling ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <RefreshCw className="mr-2 h-4 w-4" />
                )}
                {refilling ? 'Processing...' : 'Request Refill'}
              </Button>
            )}
            <Button variant="outline" onClick={() => navigate('prescriptions')}>
              Back
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
