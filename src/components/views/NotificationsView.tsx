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
  Bell,
  AlertCircle,
  Check,
  CheckCheck,
  Trash2,
  Calendar,
  Activity,
  FileText,
  MessageSquare,
  AlertTriangle,
  Loader2,
} from 'lucide-react'

interface Notification {
  id: string
  notificationType: string
  title: string
  message: string
  relatedObjectUrl: string
  isRead: boolean
  createdAt: string
}

const typeConfig: Record<string, { icon: any; color: string; border: string }> = {
  appointment: { icon: Calendar, color: 'text-cyan-600', border: 'border-l-cyan-500' },
  prescription: { icon: Activity, color: 'text-emerald-600', border: 'border-l-emerald-500' },
  medical_record: { icon: FileText, color: 'text-purple-600', border: 'border-l-purple-500' },
  message: { icon: MessageSquare, color: 'text-amber-600', border: 'border-l-amber-500' },
  system: { icon: AlertTriangle, color: 'text-red-600', border: 'border-l-red-500' },
}

export default function NotificationsView() {
  const { navigate } = useRouterStore()
  const { user } = useAuthStore()
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all')
  const [markingId, setMarkingId] = useState<string | null>(null)
  const [clearing, setClearing] = useState(false)

  useEffect(() => {
    if (!user) {
      navigate('login')
      return
    }
    fetchNotifications()
    const interval = setInterval(fetchNotifications, 30000)
    return () => clearInterval(interval)
  }, [user])

  const fetchNotifications = async () => {
    try {
      const res = await api.get<Notification[]>('/notifications')
      setNotifications(res)
    } catch (err: any) {
      setError(err.message || 'Failed to fetch notifications')
    } finally {
      setLoading(false)
    }
  }

  const handleMarkAsRead = async (id: string) => {
    try {
      setMarkingId(id)
      await api.post(`/notifications/${id}/read`)
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
      )
    } catch (err: any) {
      setError(err.message || 'Failed to mark as read')
    } finally {
      setMarkingId(null)
    }
  }

  const handleMarkAllAsRead = async () => {
    try {
      await api.post('/notifications/read-all')
      setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })))
    } catch (err: any) {
      setError(err.message || 'Failed to mark all as read')
    }
  }

  const handleClearAll = async () => {
    if (!confirm('Clear all notifications? This cannot be undone.')) return
    try {
      setClearing(true)
      await api.delete('/notifications')
      setNotifications([])
    } catch (err: any) {
      setError(err.message || 'Failed to clear notifications')
    } finally {
      setClearing(false)
    }
  }

  const filtered = notifications.filter((n) => {
    if (filter === 'unread') return !n.isRead
    if (filter === 'read') return n.isRead
    return true
  })

  const unreadCount = notifications.filter((n) => !n.isRead).length

  const filters = [
    { key: 'all' as const, label: 'All' },
    { key: 'unread' as const, label: 'Unread' },
    { key: 'read' as const, label: 'Read' },
  ]

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <Skeleton className="h-10 w-64 mb-6" />
        <div className="space-y-3">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-20" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold">Notifications</h1>
          {unreadCount > 0 && (
            <p className="text-muted-foreground mt-1">
              {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
            </p>
          )}
        </div>
        <div className="flex gap-2">
          {unreadCount > 0 && (
            <Button variant="outline" size="sm" onClick={handleMarkAllAsRead}>
              <CheckCheck className="mr-1 h-4 w-4" />
              Mark all read
            </Button>
          )}
          {notifications.length > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleClearAll}
              disabled={clearing}
              className="text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
            >
              {clearing ? (
                <Loader2 className="mr-1 h-4 w-4 animate-spin" />
              ) : (
                <Trash2 className="mr-1 h-4 w-4" />
              )}
              Clear all
            </Button>
          )}
        </div>
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
            <Bell className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No notifications</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-2">
          {filtered.map((n) => {
            const config = typeConfig[n.notificationType] || typeConfig.system
            const Icon = config.icon
            return (
              <Card
                key={n.id}
                className={`border-0 shadow-sm border-l-4 ${config.border} ${
                  !n.isRead ? 'bg-emerald-50/40' : 'opacity-75'
                }`}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3 flex-1 min-w-0">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-muted flex-shrink-0">
                        <Icon className={`h-4 w-4 ${config.color}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-sm">{n.title}</h3>
                          {!n.isRead && (
                            <span className="h-2 w-2 rounded-full bg-emerald-500 flex-shrink-0" />
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mt-0.5">{n.message}</p>
                        <p className="text-xs text-muted-foreground mt-2">
                          {new Date(n.createdAt).toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-1 flex-shrink-0">
                      {!n.isRead && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => handleMarkAsRead(n.id)}
                          disabled={markingId === n.id}
                          title="Mark as read"
                        >
                          {markingId === n.id ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <Check className="h-4 w-4" />
                          )}
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}
