'use client'
import Link from 'next/link'
import Nav from '../nav'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/cn'

export default function Header() {
  const pathname = usePathname()
  const isDashboard = pathname === '/'
  return (
    <header
      className={cn(
        'flex flex-col md:flex-row justify-between items-center h-[8vh] border-b border-line/50',
        isDashboard ? 'px-3' : 'max-w-7xl w-full mx-auto'
      )}
    >
      <Link href={'/'} className="text-xl font-bold text-content">
        Innsikt
      </Link>
      <Nav />
    </header>
  )
}
