'use client'
import { DashboardData } from '../../api/types'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { LayoutGrid } from 'lucide-react'
import DashboardCategories from './components/categories'
import DashboardKPI from './components/kpi'
type Props = {
  data: DashboardData
}
export default function DashboardControls({ data }: Props) {
  if (!data.kpi || data.totalCategories.length === 0) return null
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          className="rounded-full w-10 h-10 cursor-pointer border-line shadow-md"
          variant="outline"
        >
          <LayoutGrid />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="z-[1000]  flex flex-col gap-5 py-4 border-line/50 shadow-md"
        align="start"
      >
        <DashboardKPI data={data.kpi} />
        <DashboardCategories data={data.totalCategories} />
      </PopoverContent>
    </Popover>
  )
}
