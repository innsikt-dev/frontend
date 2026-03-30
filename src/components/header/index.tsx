import Link from 'next/link'
import Nav from '../nav'
import Section from '../wrappers/section'

export default function Header() {
  return (
    <Section>
      <header className="flex flex-col md:flex-row justify-between items-end ">
        <Link href={'/'} className="text-xl font-bold text-content">
          Innsikt
        </Link>
        <Nav />
      </header>
    </Section>
  )
}
