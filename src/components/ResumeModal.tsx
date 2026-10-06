'use client'

import * as React from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Download, FileText, ExternalLink } from 'lucide-react'
import { profile } from '@/lib/portfolio-data'

interface ResumeModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ResumeModal({ open, onOpenChange }: ResumeModalProps) {
  const resumeUrl = profile.resumeUrl

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl w-[95vw] h-[90vh] flex flex-col p-0 gap-0">
        <DialogHeader className="px-6 py-4 border-b flex-row items-center justify-between space-y-0">
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-blue-500" />
            <div>
              <DialogTitle className="text-base">My Resume</DialogTitle>
              <DialogDescription className="text-xs">
                {profile.name} — {profile.role}
              </DialogDescription>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button asChild size="sm" variant="outline">
              <a href={resumeUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-1.5 h-3.5 w-3.5" />
                Open
              </a>
            </Button>
            <Button asChild size="sm" className="bg-gradient-to-r from-blue-500 to-sky-500 hover:from-blue-600 hover:to-sky-600 text-white border-0">
              <a href={resumeUrl} download="Ajibade-Hassan-Resume.pdf">
                <Download className="mr-1.5 h-3.5 w-3.5" />
                Download
              </a>
            </Button>
          </div>
        </DialogHeader>
        <div className="flex-1 overflow-hidden bg-muted/30">
          <iframe
            src={`${resumeUrl}#toolbar=1&navpanes=0&view=FitH`}
            title="Resume preview"
            className="w-full h-full border-0"
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}
