'use client'

import { useRouterStore } from '@/store/router'
import { useAuthStore } from '@/store/auth'
import AppHeader from '@/components/AppHeader'
import AppFooter from '@/components/AppFooter'

import LandingView from '@/components/views/LandingView'
import LoginView from '@/components/views/LoginView'
import RegisterView from '@/components/views/RegisterView'
import ForgotPasswordView from '@/components/views/ForgotPasswordView'
import DashboardView from '@/components/views/DashboardView'
import DoctorDashboardView from '@/components/views/DoctorDashboardView'
import AppointmentsView from '@/components/views/AppointmentsView'
import BookAppointmentView from '@/components/views/BookAppointmentView'
import MedicalRecordsView from '@/components/views/MedicalRecordsView'
import MedicalRecordDetailView from '@/components/views/MedicalRecordDetailView'
import PrescriptionsView from '@/components/views/PrescriptionsView'
import PrescriptionDetailView from '@/components/views/PrescriptionDetailView'
import NotificationsView from '@/components/views/NotificationsView'
import ProfileView from '@/components/views/ProfileView'
import SettingsView from '@/components/views/SettingsView'

export default function Home() {
  const { view } = useRouterStore()
  const { isAuthenticated } = useAuthStore()

  // Protected views require authentication
  const protectedViews = [
    'dashboard',
    'doctor-dashboard',
    'appointments',
    'appointments-book',
    'medical-records',
    'medical-record-detail',
    'prescriptions',
    'prescription-detail',
    'notifications',
    'profile',
    'settings',
  ]

  const isProtected = protectedViews.includes(view)

  // Redirect to login if trying to access protected view without auth
  const renderView = () => {
    if (isProtected && !isAuthenticated) {
      return <LoginView />
    }

    switch (view) {
      case 'landing':
        return <LandingView />
      case 'login':
        return <LoginView />
      case 'register':
        return <RegisterView />
      case 'forgot-password':
        return <ForgotPasswordView />
      case 'dashboard':
        return <DashboardView />
      case 'doctor-dashboard':
        return <DoctorDashboardView />
      case 'appointments':
        return <AppointmentsView />
      case 'appointments-book':
        return <BookAppointmentView />
      case 'medical-records':
        return <MedicalRecordsView />
      case 'medical-record-detail':
        return <MedicalRecordDetailView />
      case 'prescriptions':
        return <PrescriptionsView />
      case 'prescription-detail':
        return <PrescriptionDetailView />
      case 'notifications':
        return <NotificationsView />
      case 'profile':
        return <ProfileView />
      case 'settings':
        return <SettingsView />
      default:
        return <LandingView />
    }
  }

  const showHeaderFooter =
    !['login', 'register', 'forgot-password'].includes(view) || isAuthenticated

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {showHeaderFooter && <AppHeader />}
      <main className="flex-1 flex flex-col">{renderView()}</main>
      {showHeaderFooter && <AppFooter />}
    </div>
  )
}
