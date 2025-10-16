import { Hero } from '@/components/hero'
import { Experience } from '@/components/experience'

export function HomePage() {
  return (
    <div className="flex flex-col md:h-full md:overflow-hidden">
      <Hero />
      <Experience />
    </div>
  )
}
