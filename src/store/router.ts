import { create } from 'zustand'

export type ViewName =
  | 'landing'
  | 'login'
  | 'register'
  | 'forgot-password'
  | 'dashboard'
  | 'doctor-dashboard'
  | 'appointments'
  | 'appointments-book'
  | 'medical-records'
  | 'medical-record-detail'
  | 'prescriptions'
  | 'prescription-detail'
  | 'notifications'
  | 'profile'
  | 'settings'

interface RouterState {
  view: ViewName
  params: Record<string, string>
  navigate: (view: ViewName, params?: Record<string, string>) => void
  back: () => void
  history: { view: ViewName; params: Record<string, string> }[]
}

export const useRouterStore = create<RouterState>((set, get) => ({
  view: 'landing',
  params: {},
  history: [],
  navigate: (view, params = {}) => {
    const { view: currentView, params: currentParams, history } = get()
    set({
      view,
      params,
      history: [...history, { view: currentView, params: currentParams }].slice(-20),
    })
    // Scroll to top on navigation
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  },
  back: () => {
    const { history } = get()
    if (history.length > 0) {
      const previous = history[history.length - 1]
      set({
        view: previous.view,
        params: previous.params,
        history: history.slice(0, -1),
      })
      if (typeof window !== 'undefined') {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    }
  },
}))
