'use client'

import Link from 'next/link'
import { Github, Linkedin, Twitter, Code2, Heart } from 'lucide-react'
import { profile, socials } from '@/lib/portfolio-data'

const socialIcons = {
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
}

const quickLinks = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
]

export default function PortfolioFooter() {
  return (
    <footer className="border-t bg-muted/30 mt-auto">
      <div className="container mx-auto px-4 py-10">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Brand */}
          <div className="space-y-3">
            <Link href="#home" className="flex items-center gap-2 font-bold">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500 text-white">
                <Code2 className="h-4 w-4" />
              </div>
              <span>Ajibade Hassan</span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs">
              {profile.role} building modern web applications. Open to new opportunities.
            </p>
          </div>

          {/* Quick links */}
          <div className="space-y-3">
            <p className="text-sm font-semibold">Quick Links</p>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-emerald-500 transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Socials */}
          <div className="space-y-3">
            <p className="text-sm font-semibold">Connect</p>
            <div className="flex gap-2">
              {socials.map((social) => {
                const Icon = socialIcons[social.icon as keyof typeof socialIcons]
                return (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-background hover:border-emerald-500 hover:text-emerald-500 transition-colors"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                )
              })}
            </div>
            <a
              href={`mailto:${profile.email}`}
              className="inline-block text-sm text-muted-foreground hover:text-emerald-500 transition-colors break-all"
            >
              {profile.email}
            </a>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Ajibade Hassan. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground flex items-center gap-1.5">
            Built with <Heart className="h-3 w-3 fill-red-500 text-red-500" /> using Next.js &amp; TypeScript
          </p>
        </div>
      </div>
    </footer>
  )
}
