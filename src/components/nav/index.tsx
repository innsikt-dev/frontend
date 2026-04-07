'use client'
import Link from 'next/link'
import { navItems } from './nav-items'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/cn'

export default function Nav() {
  const pathname = usePathname()
  const isActive = (item: (typeof navItems)[number]) => pathname === item.path

  return (
    <nav>
      <ul className="flex justify-between items-end text-content gap-4">
        {navItems.map((item) => {
          return (
            <li
              className={cn('nav-link cursor-pointer px-2 rounded-lg', {
                'border-b border-line': isActive(item),
              })}
              key={item.id}
            >
              <Link className="flex items-center gap-2" href={item.path}>
                {item.label}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
