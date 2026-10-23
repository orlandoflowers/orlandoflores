import { Badge } from "@/components/ui/badge"
import { Swiper, SwiperSlide } from 'swiper/react'
import { Mousewheel, Pagination } from 'swiper/modules'
// Import Swiper styles in global CSS
import { useTranslation } from "react-i18next"
import { useEffect, useState, type ReactNode } from "react"
import { cn } from "@/lib/utils"

interface Experience {
  id: string;
  period: {
    startDate: string;
    endDate: string;
  };
  title: string;
  company: string;
  location: {
    city: string;
    country: string;
  };
  tags: string[];
  focus?: string[];
}

// Front mirrors an experience card; the back copy lives in experience.commissionCards.<id>
interface Commission {
  id: string;
  year: string;
  title: string;
  company: string;
  tags: string[];
  stack: string[];
}

const commissions: Commission[] = [
  {
    id: "searchbrand",
    year: "2025",
    title: "Product Engineer,",
    company: "Searchbrand.AI",
    tags: ["AI", "SaaS"],
    stack: ["Next.js", "PostgreSQL", "LangChain", "Cloud Run"],
  },
  {
    id: "socratia",
    year: "2025",
    title: "Product Engineer,",
    company: "Socratia",
    tags: ["Edtech", "AI"],
    stack: ["Next.js", "Supabase", "Anthropic"],
  },
  {
    // TODO: confirm year for Ifert
    id: "ifert",
    year: "2026",
    title: "Product Engineer,",
    company: "Ifert",
    tags: ["IoT", "Data viz"],
    stack: ["AWS", "PWA", "Push alerts"],
  },
  {
    id: "ceve",
    year: "2026",
    title: "Product Engineer,",
    company: "Ceve",
    tags: ["Careers", "SaaS"],
    stack: ["React", "Supabase", "Mercado Pago"],
  },
  {
    // TODO: confirm year and details for Schedulizer and Ridding
    id: "macos",
    year: "2026",
    title: "Product Engineer,",
    company: "macOS Native Apps",
    tags: ["macOS", "Native"],
    stack: ["Swift", "SwiftUI", "AppKit"],
  },
]

const cardClass = "p-6 rounded-2xl bg-muted h-full"

// A flipped card turns back on its own after a while, slower than a click-flip.
// The countdown pauses while the pointer is over the card or it has keyboard focus.
const AUTO_RETURN_MS = 5000

function FlipCard({ front, back, label }: { front: ReactNode; back: ReactNode; label: string }) {
  const [flipped, setFlipped] = useState(false)
  const [returning, setReturning] = useState(false)
  const [engaged, setEngaged] = useState({ hover: false, focus: false })

  useEffect(() => {
    if (!flipped || engaged.hover || engaged.focus) return
    const timer = setTimeout(() => {
      setReturning(true)
      setFlipped(false)
    }, AUTO_RETURN_MS)
    return () => clearTimeout(timer)
  }, [flipped, engaged.hover, engaged.focus])

  return (
    <button
      type="button"
      aria-pressed={flipped}
      data-tilt
      onClick={() => { setReturning(false); setFlipped((f) => !f) }}
      onPointerEnter={() => setEngaged((e) => ({ ...e, hover: true }))}
      onPointerLeave={() => setEngaged((e) => ({ ...e, hover: false }))}
      // Only keyboard focus pauses it: a mouse click also focuses the button in Chrome
      onFocus={(event) => setEngaged((e) => ({ ...e, focus: event.currentTarget.matches(":focus-visible") }))}
      onBlur={() => setEngaged((e) => ({ ...e, focus: false }))}
      className="holo group block w-full h-full text-left cursor-pointer [perspective:1200px] rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
    >
      <div
        onTransitionEnd={(event) => {
          if (event.target === event.currentTarget && event.propertyName === "transform") setReturning(false)
        }}
        className={cn(
          "relative grid h-full transition-transform [transform-style:preserve-3d] motion-reduce:transition-none",
          returning ? "duration-[1600ms] ease-in-out" : "duration-500 ease-out",
          flipped && "[transform:rotateY(180deg)]"
        )}
      >
        <div aria-hidden={flipped} className={cn(cardClass, "[grid-area:1/1] [backface-visibility:hidden] transition-shadow group-hover:shadow-xs")}>
          {front}
          <span className="sr-only">{label}</span>
        </div>
        <div aria-hidden={!flipped} className={cn(cardClass, "[grid-area:1/1] [backface-visibility:hidden] [transform:rotateY(180deg)] overflow-y-auto")}>
          {back}
        </div>
      </div>
    </button>
  )
}

export function Experience() {
  const { t } = useTranslation();

  // Back copy lives in experience.cards.<id>. TODO: replace the generic lines for wetechnologies, foris and ripley
  const experiences: Experience[] = [
    {
      id: "wetechnologies",
      period: {
        startDate: "2021",
        endDate: "2022"
      },
      title: "Product Designer,",
      company: "We Technologies",
      location: {
        city: "Santiago",
        country: "CHILE"
      },
      tags: ["IOT", "AI"]
    },
    {
      id: "betterfly",
      period: {
        startDate: "2022",
        endDate: "2023"
      },
      title: "Product Designer,",
      company: "Betterfly",
      location: {
        city: "Santiago",
        country: "CHILE"
      },
      tags: ["Insurtech", "Wellness"],
      focus: ["Design system", "Mobile"]
    },
    {
      id: "foris",
      period: {
        startDate: "2023",
        endDate: "2023"
      },
      title: "Product Designer,",
      company: "Foris.AI",
      location: {
        city: "Santiago",
        country: "CHILE"
      },
      tags: ["Edtech", "AI"]
    },
    {
      id: "ripley",
      period: {
        startDate: "2023",
        endDate: "2023"
      },
      title: "Product Designer,",
      company: "Banco Ripley",
      location: {
        city: "Santiago",
        country: "CHILE"
      },
      tags: ["Banking"]
    },
    {
      id: "audienceview",
      period: {
        startDate: "2024",
        endDate: "PRESENT"
      },
      title: "Product Designer,",
      company: "AudienceView",
      location: {
        city: "Santiago + USA/CA/UK",
        country: "CHILE"
      },
      tags: ["Ticketing"],
      focus: ["Checkout", "Web"]
    }
  ];

  const Tags = ({ tags }: { tags: string[] }) => (
    <div className="flex flex-wrap gap-2 mt-4">
      {tags.map((tag) => (
        <Badge
          key={tag}
          variant="outline"
          className="px-2 py-0.5 text-xs rounded-full bg-background"
        >
          {tag}
        </Badge>
      ))}
    </div>
  )

  // Plain render functions (not components) so FlipCard keeps its flipped state across re-renders
  const experienceCard = (experience: Experience) => (
    <FlipCard
      key={experience.id}
      label={t('experience.flipHint')}
      front={
        <>
          <div className="text-sm text-muted-foreground">
            {t('experience.period', {
              startDate: experience.period.startDate,
              endDate: experience.period.endDate === "PRESENT" ? t('experience.present') : experience.period.endDate
            })}
          </div>
          <span className="block text-lg font-medium mt-2">{experience.title}</span>
          <div className="text-sm text-muted-foreground mt-1">{experience.company}</div>
          <div className="text-sm text-muted-foreground">
            {t('experience.location', {
              city: experience.location.city,
              country: experience.location.country
            })}
          </div>
          <Tags tags={experience.tags} />
        </>
      }
      back={
        <>
          <div className="text-sm font-medium">{experience.company}</div>
          <p className="text-sm text-muted-foreground mt-2 leading-relaxed line-clamp-3">
            {t(`experience.cards.${experience.id}`)}
          </p>
          {experience.focus && <Tags tags={experience.focus} />}
        </>
      }
    />
  )

  const commissionCard = (commission: Commission) => (
    <FlipCard
      key={commission.id}
      label={t('experience.flipHint')}
      front={
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between gap-2 text-sm text-muted-foreground">
            {commission.year}
            <span className="rounded-full bg-foreground px-2 py-0.5 text-[11px] font-medium text-background">
              {t('portfolio.commission')}
            </span>
          </div>
          <span className="block text-lg font-medium mt-2">{commission.title}</span>
          <div className="text-sm text-muted-foreground mt-1">{commission.company}</div>
          <Tags tags={commission.tags} />
        </div>
      }
      back={
        <div className="flex h-full flex-col">
          <div className="text-sm font-medium">{commission.company}</div>
          <p className="text-sm text-muted-foreground mt-2 leading-relaxed line-clamp-3">
            {t(`experience.commissionCards.${commission.id}`)}
          </p>
          {commission.stack.length > 0 && <Tags tags={commission.stack} />}
        </div>
      }
    />
  )

  // One row, newest first: the current role, then by most recent year. Ties keep list order.
  const endYear = (end: string) => (end === "PRESENT" ? Infinity : Number(end))
  const cards = [
    ...experiences.map((e) => ({ key: e.id, end: endYear(e.period.endDate), start: Number(e.period.startDate), render: () => experienceCard(e) })),
    ...commissions.map((c) => ({ key: c.id, end: Number(c.year), start: Number(c.year), render: () => commissionCard(c) })),
  ].sort((a, b) => b.end - a.end || b.start - a.start)

  return (
    <section className="w-full px-4 py-0 mt-4 md:mt-0 pb-16 md:pb-4 bg-background text-foreground">
      <div className="w-full mx-auto">
        <h2 className="text-xs uppercase tracking-widest mb-4 text-muted-foreground">{t('experience.title')}</h2>

        <Swiper
          modules={[Pagination, Mousewheel]}
          spaceBetween={16}
          slidesPerView={1.2}
          breakpoints={{
            768: { slidesPerView: 2.6, spaceBetween: 24 },
            1024: { slidesPerView: 3.4, spaceBetween: 24 },
            1280: { slidesPerView: 4.5, spaceBetween: 24 },
          }}
          // Vertical wheel moves the row while hovering it; at either end the page scrolls again
          mousewheel={{ releaseOnEdges: true, thresholdDelta: 10 }}
          pagination={{ clickable: true }}
          className="!pb-6"
        >
          {cards.map((card) => (
            <SwiperSlide key={card.key} className="!h-auto">
              {card.render()}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
