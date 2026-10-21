'use client'

import { useEffect, useState } from 'react'
import { useAuthStore } from '@/store/auth'
import { useRouterStore } from '@/store/router'
import { api } from '@/lib/api'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from '@/components/ui/sheet'
import {
  Activity,
  Calendar,
  FileText,
  Bell,
  User as UserIcon,
  Settings,
  LogOut,
  Menu,
  LayoutDashboard,
  Stethoscope,
} from 'lucide-react'
import { cn } from '@/lib/utils'

export default function AppHeader() {
  const { user, logout } = useAuthStore()
  const { navigate, view } = useRouterStore()
  const [unreadCount, setUnreadCount] = useState(0)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    if (!user) return
    const fetchUnread = async () => {
      try {
        const res = await api.get<{ unread_count: number }>('/notifications/unread-count')
        setUnreadCount(res.unread_count)
      } catch {
        // ignore
      }
    }
    fetchUnread()
    const interval = setInterval(fetchUnread, 30000)
    return () => clearInterval(interval)
  }, [user, view])

  const handleLogout = async () => {
    try {
      await api.post('/auth/logout')
    } catch {
      // ignore
    }
    logout()
    navigate('landing')
  }

  const navLinks = [
    { label: 'Dashboard', view: user?.role === 'doctor' ? 'doctor-dashboard' : 'dashboard', icon: LayoutDashboard },
    { label: 'Appointments', view: 'appointments', icon: Calendar },
    { label: 'Records', view: 'medical-records', icon: FileText },
    { label: 'Prescriptions', view: 'prescriptions', icon: Activity },
    { label: 'Notifications', view: 'notifications', icon: Bell },
  ] as const

  const initials = (user?.firstName?.[0] || user?.username?.[0] || '?').toUpperCase()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <button
          onClick={() => navigate(user ? (user.role === 'doctor' ? 'doctor-dashboard' : 'dashboard') : 'landing')}
          className="flex items-center gap-2 font-bold text-lg"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-600 text-white">
            <Stethoscope className="h-5 w-5" />
          </div>
          <span className="text-emerald-700">E-Hospital</span>
        </button>

        {user ? (
          <>
            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => {
                const Icon = link.icon
                const active = view === link.view
                return (
                  <button
                    key={link.label}
                    onClick={() => navigate(link.view as any)}
                    className={cn(
                      'relative flex items-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium transition-colors',
                      active
                        ? 'bg-emerald-50 text-emerald-700'
                        : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {link.label}
                    {link.label === 'Notifications' && unreadCount > 0 && (
                      <Badge
                        variant="destructive"
                        className="absolute -top-1 -right-1 h-5 min-w-5 justify-center px-1 text-xs"
                      >
                        {unreadCount}
                      </Badge>
                    )}
                  </button>
                )
              })}
            </nav>

            {/* User menu */}
            <div className="flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-2 rounded-full border p-1 pr-2 hover:bg-muted transition-colors">
                    <Avatar className="h-8 w-8 bg-emerald-600">
                      <AvatarFallback className="bg-emerald-600 text-white text-sm">
                        {initials}
                      </AvatarFallback>
                    </Avatar>
                    <span className="hidden md:inline text-sm font-medium">
                      {user.firstName || user.username}
                    </span>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <div className="flex flex-col">
                      <span className="font-medium">{user.firstName} {user.lastName}</span>
                      <span className="text-xs text-muted-foreground font-normal capitalize">{user.role}</span>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate('profile')}>
                    <UserIcon className="mr-2 h-4 w-4" />
                    My Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('settings')}>
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="text-red-600 focus:text-red-600">
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Mobile menu */}
              <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-72">
                  <SheetTitle className="text-left">Menu</SheetTitle>
                  <nav className="mt-6 flex flex-col gap-1">
                    {navLinks.map((link) => {
                      const Icon = link.icon
                      return (
                        <button
                          key={link.label}
                          onClick={() => {
                            navigate(link.view as any)
                            setMobileOpen(false)
                          }}
                          className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-muted"
                        >
                          <Icon className="h-4 w-4" />
                          {link.label}
                        </button>
                      )
                    })}
                    <div className="my-2 border-t" />
                    <button
                      onClick={() => { navigate('profile'); setMobileOpen(false) }}
                      className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-muted"
                    >
                      <UserIcon className="h-4 w-4" />
                      My Profile
                    </button>
                    <button
                      onClick={() => { navigate('settings'); setMobileOpen(false) }}
                      className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-muted"
                    >
                      <Settings className="h-4 w-4" />
                      Settings
                    </button>
                    <button
                      onClick={() => { handleLogout(); setMobileOpen(false) }}
                      className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
                    >
                      <LogOut className="h-4 w-4" />
                      Logout
                    </button>
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
          </>
        ) : (
          <div className="flex items-center gap-2">
            <Button variant="ghost" onClick={() => navigate('login')}>
              Login
            </Button>
            <Button onClick={() => navigate('register')} className="bg-emerald-600 hover:bg-emerald-700">
              Register
            </Button>
          </div>
        )}
      </div>
    </header>
  )
}
