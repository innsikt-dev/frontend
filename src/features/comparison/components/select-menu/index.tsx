'use client'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import { usePageParams } from '@/hooks/use-page-params'
import { useEffect } from 'react'
import { ComparisonName } from '../../api/types'
type Props = {
  data: ComparisonName[]
  paramKey: 'municipality1' | 'municipality2'
}
export function SelectMenu({ data, paramKey }: Props) {
  const { period, municipality1, municipality2, update } = usePageParams()

  useEffect(() => {
    if (!municipality1 && !municipality2) {
      update({ municipality1: 'Oslo', municipality2: 'Bergen', period: '7d' })
    } else if (!municipality1) {
      update({ municipality1: 'Oslo', period: '7d' })
    } else if (!municipality2) {
      update({ municipality2: 'Bergen', period: '7d' })
    }
  }, [])

  const currentValue =
    paramKey === 'municipality1' ? municipality1 : municipality2

  return (
    <Select
      value={currentValue ?? ''}
      onValueChange={(v) => update({ period, [paramKey]: v })}
    >
      <SelectTrigger className="w-full max-w-48">
        <SelectValue
          placeholder={paramKey === 'municipality1' ? 'Oslo' : 'Bergen'}
        />
      </SelectTrigger>
      <SelectContent className="max-h-[40vh]" position="popper">
        <SelectGroup>
          <SelectLabel>Kommuner</SelectLabel>
          {data.map((d, i) => (
            <SelectItem key={i} value={d.municipality_name}>
              {d.municipality_name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
