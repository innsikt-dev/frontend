'use client'
import Container from '@/components/wrappers/container'
import { Municipalities } from '../../api/types'
import { usePageParams } from '@/hooks/use-page-params'
import { cn } from '@/lib/cn'
import { useState } from 'react'

type Props = {
  data: Municipalities[]
}
const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅ'.split('')
export default function Sidebar({ data }: Props) {
  const [search, setSearch] = useState('')
  const { period, municipality, update } = usePageParams()
  const groupedMunicipalities = alphabet.map((letter) => ({
    letter,
    municipalities: data.filter((d) =>
      d.municipality_name.toLowerCase().startsWith(letter.toLowerCase())
    ),
  }))
  const filtered = data.filter((d) =>
    d.municipality_name.toLowerCase().includes(search.toLowerCase())
  )
  const isSearching = search.length > 0

  return (
    <nav className="max-w-60 w-full border-r border-line/50 height overflow-scroll">
      <Container className="flex items-center gap-2 border-b border-line/50 px-4 py-2">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Søk kommune..."
          className="w-full text-sm outline-none bg-transparent"
        />
      </Container>
      {isSearching ? (
        <ul className="flex flex-col gap-2 my-4">
          {filtered.map((m) => (
            <li key={m.municipality_name}>
              <button
                onClick={() =>
                  update({ period, municipality: m.municipality_name })
                }
                className={cn(
                  'text-sm font-semibold text-content-muted hover:text-black duration-150 cursor-pointer text-left w-full px-4',
                  { 'text-black': municipality === m.municipality_name }
                )}
              >
                {m.municipality_name}
              </button>
            </li>
          ))}
        </ul>
      ) : (
        groupedMunicipalities
          .filter((g) => g.municipalities.length > 0)
          .map((g) => (
            <Container className="flex flex-col gap-4 my-4" key={g.letter}>
              <p className="text-xs font-bold text-content-muted/80 px-4">
                {g.letter}
              </p>
              <ul className="flex flex-col gap-2">
                {g.municipalities.map((m) => (
                  <li key={m.municipality_name}>
                    <button
                      onClick={() =>
                        update({ period, municipality: m.municipality_name })
                      }
                      className={cn(
                        'text-sm font-semibold text-content-muted hover:text-black duration-150 cursor-pointer text-left w-full px-4',
                        { 'text-black': municipality === m.municipality_name }
                      )}
                    >
                      {m.municipality_name}
                    </button>
                  </li>
                ))}
              </ul>
            </Container>
          ))
      )}
    </nav>
  )
}
