'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Github, Linkedin, Twitter, ArrowRight, MapPin, Sparkles } from 'lucide-react'
import { profile, socials, stats } from '@/lib/portfolio-data'

const socialIcons = {
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
}

export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center pt-20 pb-12 overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-teal-500/5" />
        <div className="absolute top-1/4 -left-32 h-96 w-96 rounded-full bg-emerald-500/10 blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 h-96 w-96 rounded-full bg-teal-500/10 blur-3xl" />
      </div>

      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Text content */}
          <div className="lg:col-span-7 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-sm font-medium text-emerald-600 dark:text-emerald-400"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              Available for opportunities
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="space-y-3"
            >
              <p className="text-lg text-muted-foreground">Hi, I&apos;m</p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
                Ajibade{' '}
                <span className="bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">
                  Hassan
                </span>
              </h1>
              <h2 className="text-2xl sm:text-3xl font-semibold text-muted-foreground">
                {profile.role}
              </h2>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-base sm:text-lg text-muted-foreground max-w-2xl leading-relaxed"
            >
              {profile.tagline}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap items-center gap-3"
            >
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white border-0"
              >
                <a href="#projects" className="text-sm sm:text-base">
                  View My Work
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a href="#contact" className="text-sm sm:text-base">
                  Get In Touch
                </a>
              </Button>
            </motion.div>

            {/* Social links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex items-center gap-3 pt-2"
            >
              {socials.map((social) => {
                const Icon = socialIcons[social.icon as keyof typeof socialIcons]
                return (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background hover:border-emerald-500 hover:text-emerald-500 transition-colors"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                )
              })}
              <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground ml-2">
                <MapPin className="h-3.5 w-3.5" />
                {profile.location}
              </span>
            </motion.div>
          </div>

          {/* Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="lg:col-span-5"
          >
            <div className="relative mx-auto max-w-sm">
              {/* Avatar placeholder with gradient */}
              <div className="relative aspect-square rounded-3xl bg-gradient-to-br from-emerald-500 to-teal-500 p-1">
                <div className="h-full w-full rounded-3xl bg-background flex items-center justify-center overflow-hidden">
                  <div className="text-center p-8">
                    <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 text-white">
                      <Sparkles className="h-10 w-10" />
                    </div>
                    <p className="text-2xl font-bold">
                      {profile.firstName}
                      <br />
                      {profile.lastName}
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">{profile.role}</p>
                  </div>
                </div>
              </div>

              {/* Floating stat badges */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-4 -left-4 rounded-xl border border-border bg-background/90 backdrop-blur px-4 py-2 shadow-lg"
              >
                <p className="text-xs text-muted-foreground">Building</p>
                <p className="text-sm font-bold">Web Apps</p>
              </motion.div>
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="absolute -bottom-4 -right-4 rounded-xl border border-border bg-background/90 backdrop-blur px-4 py-2 shadow-lg"
              >
                <p className="text-xs text-muted-foreground">Open to</p>
                <p className="text-sm font-bold">Work</p>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {stats.map((stat) => (
            <Card key={stat.label} className="border-0 shadow-sm bg-muted/30">
              <CardContent className="p-5 text-center">
                <p className="text-3xl font-bold bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">
                  {stat.value}
                </p>
                <p className="text-xs text-muted-foreground mt-1 uppercase tracking-wide">
                  {stat.label}
                </p>
              </CardContent>
            </Card>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
