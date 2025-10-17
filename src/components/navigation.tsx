import { Link, useLocation } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { useTranslation } from 'react-i18next'

const navigationItems = [
  { nameKey: "navigation.designer", href: '/designer' },
  { nameKey: "navigation.developer", href: '/developer' },
]

export function Navigation() {
  const location = useLocation()
  const { t } = useTranslation()

  return (
    <nav className="hidden md:flex items-center justify-center space-x-8">
      {navigationItems.map((item) => (
        <Link
          key={item.nameKey}
          to={item.href}
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            location.pathname === item.href
              ? "text-primary"
              : "text-muted-foreground"
          )}
        >
          {t(item.nameKey)}
        </Link>
      ))}
    </nav>
  )
}

export function MobileNavigation() {
  const location = useLocation()
  const { t } = useTranslation()

  return (
    <nav className="md:hidden flex flex-col space-y-4 p-4 bg-background border-t">
      {navigationItems.map((item) => (
        <Link
          key={item.nameKey}
          to={item.href}
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary py-2",
            location.pathname === item.href
              ? "text-primary"
              : "text-muted-foreground"
          )}
        >
          {t(item.nameKey)}
        </Link>
      ))}
    </nav>
  )
}
