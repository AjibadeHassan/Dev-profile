'use client'

import { useRouterStore } from '@/store/router'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  Stethoscope,
  Calendar,
  FileText,
  Bell,
  Activity,
  ShieldCheck,
  Clock,
  Users,
  ArrowRight,
} from 'lucide-react'

export default function LandingView() {
  const { navigate } = useRouterStore()

  const features = [
    {
      icon: Calendar,
      title: 'Smart Appointments',
      description: 'Book, reschedule, and manage appointments with real-time availability.',
    },
    {
      icon: FileText,
      title: 'Medical Records',
      description: 'Secure access to your complete medical history, lab results, and imaging.',
    },
    {
      icon: Activity,
      title: 'Prescriptions',
      description: 'Track active medications, request refills, and view dosage instructions.',
    },
    {
      icon: Bell,
      title: 'Real-time Notifications',
      description: 'Stay informed with appointment reminders and health updates.',
    },
    {
      icon: ShieldCheck,
      title: 'Secure & Verified',
      description: 'Role-based access for patients, doctors, nurses, and pharmacists.',
    },
    {
      icon: Users,
      title: 'Multi-Role Dashboard',
      description: 'Personalized experience for every healthcare team member.',
    },
  ]

  return (
    <div className="flex-1">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-50 via-background to-teal-50">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5 text-sm font-medium text-emerald-700">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              Trusted by 10,000+ patients
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-gray-900">
              Your Health,{' '}
              <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                Connected
              </span>
            </h1>
            <p className="mt-6 text-lg md:text-xl text-muted-foreground">
              A comprehensive healthcare management system bringing patients, doctors,
              and care teams together in one secure platform.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button
                size="lg"
                onClick={() => navigate('register')}
                className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-base h-12 px-8"
              >
                Get Started Free
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => navigate('login')}
                className="w-full sm:w-auto text-base h-12 px-8"
              >
                Sign In
              </Button>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              Demo accounts available — try it instantly with pre-loaded data
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y bg-emerald-600 text-white">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold">10k+</div>
              <div className="text-sm text-emerald-100 mt-1">Active Patients</div>
            </div>
            <div>
              <div className="text-3xl font-bold">500+</div>
              <div className="text-sm text-emerald-100 mt-1">Doctors</div>
            </div>
            <div>
              <div className="text-3xl font-bold">50k+</div>
              <div className="text-sm text-emerald-100 mt-1">Appointments</div>
            </div>
            <div>
              <div className="text-3xl font-bold">24/7</div>
              <div className="text-sm text-emerald-100 mt-1">Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Everything you need for better care
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Powerful tools designed to streamline healthcare for everyone
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => {
              const Icon = feature.icon
              return (
                <Card key={feature.title} className="border-0 shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-50">
                      <Icon className="h-6 w-6 text-emerald-600" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <Stethoscope className="mx-auto h-12 w-12 mb-4 opacity-90" />
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to take control of your health?
          </h2>
          <p className="text-lg text-emerald-50 mb-8 max-w-2xl mx-auto">
            Join E-Hospital today and experience healthcare management reimagined.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button
              size="lg"
              variant="secondary"
              onClick={() => navigate('register')}
              className="w-full sm:w-auto bg-white text-emerald-700 hover:bg-emerald-50 text-base h-12 px-8"
            >
              Create Account
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => navigate('login')}
              className="w-full sm:w-auto border-white text-white hover:bg-white/10 hover:text-white text-base h-12 px-8"
            >
              <Clock className="mr-2 h-4 w-4" />
              Sign In
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
