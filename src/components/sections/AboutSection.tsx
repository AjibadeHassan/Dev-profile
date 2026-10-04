'use client'

import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Code2, Server, Wrench, User } from 'lucide-react'
import { profile, skills } from '@/lib/portfolio-data'

const services = [
  {
    icon: Code2,
    title: 'Frontend Development',
    description: 'Building responsive, accessible, and beautiful user interfaces with React, Next.js, and TypeScript.',
    color: 'text-emerald-500',
    bg: 'bg-emerald-500/10',
  },
  {
    icon: Server,
    title: 'Backend Development',
    description: 'Designing robust APIs and server-side logic with Node.js, Python, Django, and REST architecture.',
    color: 'text-teal-500',
    bg: 'bg-teal-500/10',
  },
  {
    icon: Wrench,
    title: 'Full-Stack Integration',
    description: 'Connecting client and server seamlessly, with databases, auth, and deployment pipelines.',
    color: 'text-cyan-500',
    bg: 'bg-cyan-500/10',
  },
]

export default function AboutSection() {
  return (
    <section id="about" className="py-20 sm:py-28 relative">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <p className="text-sm font-semibold text-emerald-500 uppercase tracking-widest mb-2">
            Get To Know Me
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold">About Me</h2>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-10">
          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 space-y-5"
          >
            <div className="flex items-center gap-2 mb-2">
              <User className="h-5 w-5 text-emerald-500" />
              <h3 className="text-xl font-semibold">Who I Am</h3>
            </div>
            {profile.bio.map((paragraph, idx) => (
              <p key={idx} className="text-muted-foreground leading-relaxed">
                {paragraph}
              </p>
            ))}

            {/* Service cards */}
            <div className="grid sm:grid-cols-3 gap-4 pt-4">
              {services.map((service) => {
                const Icon = service.icon
                return (
                  <Card key={service.title} className="border-0 shadow-sm hover:shadow-md transition-shadow">
                    <CardContent className="p-5">
                      <div className={`mb-3 flex h-10 w-10 items-center justify-center rounded-lg ${service.bg}`}>
                        <Icon className={`h-5 w-5 ${service.color}`} />
                      </div>
                      <h4 className="font-semibold text-sm mb-1">{service.title}</h4>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {service.description}
                      </p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            <div className="pt-2">
              <Button asChild className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white border-0">
                <a href="#contact">Let&apos;s Work Together</a>
              </Button>
            </div>
          </motion.div>

          {/* Skills */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-5"
            id="skills"
          >
            <Card className="border-0 shadow-sm bg-muted/30">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-6">
                  <Wrench className="h-5 w-5 text-emerald-500" />
                  <h3 className="text-xl font-semibold">My Skills</h3>
                </div>
                <div className="space-y-6">
                  {Object.entries(skills).map(([category, items]) => (
                    <div key={category}>
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">
                        {category}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {items.map((skill) => (
                          <span
                            key={skill}
                            className="inline-flex items-center rounded-full border border-border bg-background px-3 py-1 text-sm font-medium hover:border-emerald-500 hover:text-emerald-500 transition-colors cursor-default"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
