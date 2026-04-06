import Container from '@/components/wrappers/container'
import DashboardKPI from './kpi'
import { DashboardData } from '@/features/dashboard/api/types'
import DashboardCategories from './categories'
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { LayoutGrid } from 'lucide-react'
type Props = {
  data: DashboardData
}
export default function DashboardWrapper({ data }: Props) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="z-[1000]" variant="outline">
          <LayoutGrid />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="z-[1000]" align="start">
        <PopoverHeader>
          <PopoverTitle>Dimensions</PopoverTitle>
          <PopoverDescription>
            Set the dimensions for the layer.
          </PopoverDescription>
        </PopoverHeader>
      </PopoverContent>
    </Popover>
    /*     <Container className="flex flex-col bg-surface border rounded-lg shadow-sm border-line">
      <DashboardKPI data={data.kpi} />
      <DashboardCategories data={data.totalCategories} />
    </Container> */
  )
}
