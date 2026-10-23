export const CONTACT_EMAIL = "of@orlandoflores.com"

// Every "Get in touch" opens the same email, with a subject so site leads are easy to sort
export const contactHref = (subject: string) =>
  `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}`
