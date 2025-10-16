import { Link, useLocation } from 'react-router-dom'
import { cn } from '@/lib/utils'

const navigationItems = [
  { name: "I'm a Designer", href: '/designer' },
  { name: "I'm a Developer", href: '/developer' },
]

export function Navigation() {
  const location = useLocation()

  return (
    <nav className="hidden md:flex items-center justify-center space-x-8">
      {navigationItems.map((item) => (
        <Link
          key={item.name}
          to={item.href}
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            location.pathname === item.href
              ? "text-primary"
              : "text-muted-foreground"
          )}
        >
          {item.name}
        </Link>
      ))}
    </nav>
  )
}

export function MobileNavigation() {
  const location = useLocation()

  return (
    <nav className="md:hidden flex flex-col space-y-4 p-4 bg-background border-t">
      {navigationItems.map((item) => (
        <Link
          key={item.name}
          to={item.href}
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary py-2",
            location.pathname === item.href
              ? "text-primary"
              : "text-muted-foreground"
          )}
        >
          {item.name}
        </Link>
      ))}
    </nav>
  )
}
