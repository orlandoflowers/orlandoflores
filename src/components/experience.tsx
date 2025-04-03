import { Badge } from "@/components/ui/badge"
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'
// @ts-ignore - ¡Chis! TypeScript no cacha na' de CSS mágico, el pobre weon 🧙‍♂️
import 'swiper/css'
// @ts-ignore - TypeScript pregunta "¿Qué onda esta weá?" y nosotros "¡Ya córtala y compila no más!" 🙈
import 'swiper/css/pagination'
import { useTranslation } from "react-i18next"

interface Experience {
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
}

export function Experience() {
  const { t } = useTranslation();
  
  const experiences: Experience[] = [
    {
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
      tags: ["Insurtech", "Wellness"]
    },
    {
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
      tags: ["Ticketing"]
    }
  ];

  const ExperienceCard = ({ experience, index }: { experience: Experience; index: number }) => (
    <div 
      key={index} 
      className="p-6 rounded-2xl bg-muted transition-transform duration-300 ease-out hover:scale-[1.02] hover:shadow-xs h-full"
    >
      <div className="text-sm text-muted-foreground">
        {t('experience.period', { 
          startDate: experience.period.startDate, 
          endDate: experience.period.endDate === "PRESENT" ? t('experience.present') : experience.period.endDate 
        })}
      </div>
      <h3 className="text-lg font-medium mt-2">{experience.title}</h3>
      <div className="text-sm text-muted-foreground mt-1">{experience.company}</div>
      <div className="text-sm text-muted-foreground">
        {t('experience.location', { 
          city: experience.location.city, 
          country: experience.location.country 
        })}
      </div>
      <div className="flex flex-wrap gap-2 mt-4">
        {experience.tags.map((tag: string, tagIndex: number) => (
          <Badge
            key={tagIndex}
            variant="outline"
            className="px-2 py-0.5 text-xs rounded-full bg-background"
          >
            {tag}
          </Badge>
        ))}
      </div>
    </div>
  );

  return (
    <section className="w-full px-4 py-0 mt-4 md:mt-0 pb-16 md:pb-4 bg-background text-foreground">
      <div className="w-full mx-auto">
        <h2 className="text-xs uppercase tracking-widest mb-4 text-muted-foreground">{t('experience.title')}</h2>
        
        {/* Mobile Carousel */}
        <div className="md:hidden">
          <Swiper
            modules={[Pagination]}
            spaceBetween={16}
            slidesPerView={1.2}
            pagination={{ clickable: true }}
            className="!pb-6"
          >
            {experiences.map((experience, index) => (
              <SwiperSlide key={index}>
                <ExperienceCard experience={experience} index={index} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        
        {/* Desktop Grid */}
        <div className="hidden md:grid md:grid-cols-5 gap-8">
          {experiences.map((experience, index) => (
            <ExperienceCard key={index} experience={experience} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
} 