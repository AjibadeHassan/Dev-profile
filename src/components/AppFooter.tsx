'use client'

import { Stethoscope } from 'lucide-react'

export default function AppFooter() {
  return (
    <footer className="mt-auto border-t bg-muted/30">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-emerald-600 text-white">
              <Stethoscope className="h-4 w-4" />
            </div>
            <span className="font-semibold text-emerald-700">E-Hospital</span>
            <span>— Healthcare Management System</span>
          </div>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span>© {new Date().getFullYear()} E-Hospital. All rights reserved.</span>
            <span className="hidden md:inline">•</span>
            <span className="hidden md:inline">Demo build for educational purposes</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
