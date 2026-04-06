'use client'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import Container from '@/components/wrappers/container'
import { usePageParams } from '@/hooks/use-page-params'

export default function PerCapita() {
  const { perCapita, update } = usePageParams()
  const isChecked = perCapita === 'true'

  return (
    <Container className="flex items-center space-x-2">
      <Switch
        id="per-capita"
        checked={isChecked}
        onCheckedChange={(val) => update({ perCapita: val ? 'true' : null })}
        className="cursor-pointer"
      />
      <Label className="text-xs text-content-muted" htmlFor="per-capita">
        Per 1 000 innbyggere
      </Label>
    </Container>
  )
}
