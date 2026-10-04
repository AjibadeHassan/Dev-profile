'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Github, ExternalLink, Star, FolderGit2 } from 'lucide-react'
import { projects, type Project } from '@/lib/portfolio-data'
import { cn } from '@/lib/utils'

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
    >
      <Card
        className={cn(
          'group relative h-full overflow-hidden border-0 shadow-sm hover:shadow-xl transition-all duration-300',
          project.featured && 'ring-1 ring-emerald-500/30'
        )}
      >
        {/* Gradient accent strip */}
        <div className={cn('h-1 w-full bg-gradient-to-r', project.accent)} />

        {project.featured && (
          <div className="absolute top-3 right-3 z-10">
            <Badge className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white border-0 gap-1">
              <Star className="h-3 w-3 fill-current" />
              Featured
            </Badge>
          </div>
        )}

        <CardContent className="p-6 flex flex-col h-full">
          {/* Icon + category */}
          <div className="flex items-center gap-3 mb-4">
            <div className={cn('flex h-11 w-11 items-center justify-center rounded-lg bg-gradient-to-br text-white', project.accent)}>
              <FolderGit2 className="h-5 w-5" />
            </div>
            <Badge variant="outline" className="text-xs font-medium">
              {project.category}
            </Badge>
          </div>

          {/* Title + description */}
          <h3 className="text-xl font-bold mb-2 group-hover:text-emerald-500 transition-colors">
            {project.title}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">
            {project.description}
          </p>

          {/* Tech stack */}
          <div className="flex flex-wrap gap-1.5 mb-5 mt-auto">
            {project.tech.map((tech) => (
              <span
                key={tech}
                className="inline-flex items-center rounded-md bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground"
              >
                {tech}
              </span>
            ))}
          </div>
        </CardContent>

        <CardFooter className="p-6 pt-0 gap-2">
          {project.liveUrl && (
            <Button asChild size="sm" variant="outline" className="flex-1">
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-1.5 h-3.5 w-3.5" />
                Live
              </a>
            </Button>
          )}
          <Button
            asChild
            size="sm"
            variant={project.liveUrl ? 'outline' : 'default'}
            className={cn(
              'flex-1',
              !project.liveUrl && 'bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white border-0'
            )}
          >
            <a href={project.codeUrl} target="_blank" rel="noopener noreferrer">
              <Github className="mr-1.5 h-3.5 w-3.5" />
              Code
            </a>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}

export default function ProjectsSection() {
  const featured = projects.filter((p) => p.featured)
  const others = projects.filter((p) => !p.featured)

  return (
    <section id="projects" className="py-20 sm:py-28 bg-muted/20">
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
            What I&apos;ve Built
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold mb-3">Featured Projects</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A selection of personal and professional projects showcasing my work across the stack.
          </p>
        </motion.div>

        {/* Featured projects (full-width cards) */}
        {featured.map((project, idx) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="mb-8"
          >
            <Card className="overflow-hidden border-0 shadow-sm hover:shadow-xl transition-shadow ring-1 ring-emerald-500/20">
              <div className="grid md:grid-cols-2">
                {/* Visual side */}
                <div className={cn('relative min-h-[240px] bg-gradient-to-br p-8 flex items-center justify-center', project.accent)}>
                  <div className="absolute inset-0 opacity-20" style={{
                    backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
                    backgroundSize: '24px 24px',
                  }} />
                  <div className="relative text-center text-white">
                    <FolderGit2 className="h-16 w-16 mx-auto mb-4 opacity-90" />
                    <p className="text-2xl font-bold">{project.title}</p>
                    <p className="text-sm opacity-80 mt-1">{project.category} Project</p>
                  </div>
                </div>

                {/* Content side */}
                <div className="p-6 sm:p-8 flex flex-col">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white border-0 gap-1">
                      <Star className="h-3 w-3 fill-current" />
                      Featured
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {project.category}
                    </Badge>
                  </div>
                  <h3 className="text-2xl font-bold mb-3">{project.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                    {project.longDescription}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="inline-flex items-center rounded-md bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2 mt-auto">
                    {project.liveUrl && (
                      <Button asChild size="sm" variant="outline">
                        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="mr-1.5 h-3.5 w-3.5" />
                          View Project
                        </a>
                      </Button>
                    )}
                    <Button
                      asChild
                      size="sm"
                      className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white border-0"
                    >
                      <a href={project.codeUrl} target="_blank" rel="noopener noreferrer">
                        <Github className="mr-1.5 h-3.5 w-3.5" />
                        Source Code
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}

        {/* Other projects grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {others.map((project, idx) => (
            <ProjectCard key={project.id} project={project} index={idx} />
          ))}
        </div>

        {/* See more on GitHub */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mt-12"
        >
          <Button asChild size="lg" variant="outline">
            <a href="https://github.com/AjibadeHassan?tab=repositories" target="_blank" rel="noopener noreferrer">
              <Github className="mr-2 h-4 w-4" />
              See More on GitHub
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
