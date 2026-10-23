import { Hero } from '@/components/hero'
import { Experience } from '@/components/experience'

export function HomePage() {
  return (
    // On phones the hero and the Experience row share the first screen (viewport minus the 69px header)
    <div className="flex flex-col min-h-[calc(100dvh-69px)] md:min-h-0 md:h-full md:overflow-hidden">
      <Hero />
      <Experience />
    </div>
  )
}
