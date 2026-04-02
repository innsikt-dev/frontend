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
import { MunicipalityName } from '../../api/types'
type Props = {
  data: MunicipalityName[]
  paramKey: 'municipality1' | 'municipality2'
}
export function SelectMenu({ data, paramKey }: Props) {
  const { period, municipality1, municipality2, update } = usePageParams()

  const currentValue =
    paramKey === 'municipality1'
      ? (municipality1 ?? 'Oslo')
      : (municipality2 ?? 'Bergen')
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
