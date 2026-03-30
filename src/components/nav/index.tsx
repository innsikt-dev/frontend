import Link from 'next/link'
import { navItems } from './nav-items'

export default function Nav() {
  return (
    <nav>
      <ul className="flex justify-between items-end text-content gap-4">
        {navItems.map((item) => {
          const Icon = item.icon
          return (
            <li className="nav-link" key={item.id}>
              <Link className="flex items-center gap-2" href={item.path}>
                <Icon size={14} />
                {item.label}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
