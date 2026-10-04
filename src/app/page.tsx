'use client'

import PortfolioHeader from '@/components/PortfolioHeader'
import PortfolioFooter from '@/components/PortfolioFooter'
import HeroSection from '@/components/sections/HeroSection'
import AboutSection from '@/components/sections/AboutSection'
import ProjectsSection from '@/components/sections/ProjectsSection'
import ContactSection from '@/components/sections/ContactSection'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <PortfolioHeader />
      <main className="flex-1 flex flex-col">
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <ContactSection />
      </main>
      <PortfolioFooter />
    </div>
  )
}
