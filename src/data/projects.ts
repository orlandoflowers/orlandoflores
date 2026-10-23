// Portfolio projects. Copy lives in src/locales/*.json under "portfolio.projects.<id>".
// Media files go in public/portfolio/<id>/.

export type ProjectTag = "work" | "commission" | "personal" | "ai" | "mobile" | "web" | "native" | "voice" | "design-system"

export type MediaItem = {
  type: "image" | "video"
  src: string
  poster?: string
  captionKey: string
  alt: string
  aspect: number // width / height
}

export type MediaRow = {
  items: MediaItem[]
}

export type Project = {
  id: string
  name: string
  company: string
  year: string // not shown; the page sorts newest first by the last year
  accent: string // label dot colour, Linear-style
  tags: ProjectTag[]
  link?: string
  linkAsText?: boolean // show the domain without making it clickable
  caseStudy?: string
  rows: MediaRow[]
}

export const isCommission = (id: string) =>
  projects.find((p) => p.id === id)?.tags.includes("commission") ?? false

export const projects: Project[] = [
  {
    id: "searchbrand",
    caseStudy: "/media/searchbrand/case-study.webp",
    name: "AI Brand Visibility",
    company: "Searchbrand.AI",
    year: "2025",
    accent: "#4ea7fc",
    tags: ["commission", "ai", "web", "mobile"],
    link: "https://searchbrand.ai",
    rows: [
      {
        items: [
          {
            type: "video",
            src: "/media/searchbrand/desktop.mp4",
            captionKey: "desktop",
            poster: "/media/searchbrand/desktop-poster.jpg",
            alt: "Signing up, confirming the brand profile, the first AI analysis, the dashboard and topics on desktop",
            aspect: 1920 / 1200,
          },
          {
            type: "video",
            src: "/media/searchbrand/mobile.mp4",
            captionKey: "mobile",
            poster: "/media/searchbrand/mobile-poster.jpg",
            alt: "The same Searchbrand.AI flow on an iPhone",
            aspect: 720 / 1280,
          },
        ],
      },
      {
        items: [
          {
            type: "video",
            src: "/media/searchbrand/marquee.mp4",
            captionKey: "marquee",
            poster: "/media/searchbrand/marquee-poster.jpg",
            alt: "Searchbrand.AI mobile screens gliding past, each one scrolling",
            aspect: 16 / 9,
          },
        ],
      },
    ],
  },
  {
    id: "socratia",
    caseStudy: "/media/socratia/case-study.webp",
    name: "AI Learning Companion",
    company: "Socratia",
    year: "2025",
    accent: "#f2994a",
    tags: ["commission", "ai", "web", "voice"],
    rows: [
      {
        items: [
          {
            type: "video",
            src: "/media/socratia/journey.mp4",
            captionKey: "journey",
            poster: "/media/socratia/journey-poster.jpg",
            alt: "Starting today's class with Delfí, answering an exercise, the class summary and practice",
            aspect: 1920 / 1200,
          },
        ],
      },
      {
        items: [
          {
            type: "video",
            src: "/media/socratia/talk.mp4",
            captionKey: "talk",
            poster: "/media/socratia/talk-poster.jpg",
            alt: "A voice class with Delfí: starting to talk, answering out loud and solving it",
            aspect: 1920 / 1200,
          },
          {
            type: "video",
            src: "/media/socratia/moods.mp4",
            captionKey: "moods",
            poster: "/media/socratia/moods-poster.jpg",
            alt: "Gliding across Delfí's sixteen moods, from greeting and thinking to celebrating and sleeping",
            aspect: 16 / 9,
          },
        ],
      },
    ],
  },
  {
    id: "audioswitch",
    name: "Native macOS App",
    company: "AudioSwitch",
    year: "2026",
    accent: "#4cb7a5",
    tags: ["personal", "native"],
    rows: [
      {
        items: [
          {
            type: "video",
            src: "/media/audioswitch/switcher.mp4",
            captionKey: "switcher",
            poster: "/media/audioswitch/switcher-poster.jpg",
            alt: "The AudioSwitch panel cycling through audio outputs and inputs, then stepping back",
            aspect: 730 / 750,
          },
          {
            type: "video",
            src: "/media/audioswitch/settings.mp4",
            captionKey: "settings",
            poster: "/media/audioswitch/settings-poster.jpg",
            alt: "The AudioSwitch Settings window with the hold key and trigger key pickers",
            aspect: 882 / 726,
          },
        ],
      },
    ],
  },
  {
    id: "betterfly",
    caseStudy: "/media/betterfly/case-study.webp",
    name: "Wellness & Insurance App",
    company: "Betterfly",
    year: "2022–2023",
    accent: "#68cc58",
    tags: ["work", "mobile", "design-system"],
    link: "https://www.betterfly.com",
    rows: [
      {
        items: [
          {
            type: "video",
            src: "/media/betterfly/home-standard.mp4",
            captionKey: "home-standard",
            poster: "/media/betterfly/home-standard-poster.jpg",
            alt: "Scrolling the Betterfly home screen to its challenges",
            aspect: 1, // the phone sits in the middle of the 16:10 video, so it crops to square
          },
          {
            type: "video",
            src: "/media/betterfly/onboarding.mp4",
            captionKey: "onboarding",
            poster: "/media/betterfly/onboarding-poster.jpg",
            alt: "Signing up for Betterfly, from the welcome carousel to the registration progress screen",
            aspect: 1,
          },
        ],
      },
      {
        items: [
          {
            type: "video",
            src: "/media/betterfly/design-system.mp4",
            captionKey: "design-system",
            poster: "/media/betterfly/design-system-poster.jpg",
            alt: "Scrolling through the Betterfly challenges design system",
            aspect: 1172 / 660,
          },
        ],
      },
    ],
  },
  {
    id: "audienceview",
    name: "Ticketing Platform",
    company: "AudienceView",
    year: "2025",
    accent: "#b56cf0",
    tags: ["work", "web", "voice"],
    link: "https://www.audienceview.com",
    linkAsText: true,
    rows: [
      {
        items: [
          {
            type: "image",
            src: "/media/audienceview/checkout-flow.webp",
            captionKey: "checkout-flow",
            alt: "AudienceView Unlimited checkout: picking a seat on the Knight Theater map and choosing its price type",
            aspect: 2000 / 1200,
          },
        ],
      },
    ],
  },
]
