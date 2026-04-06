import { DashboardKpi } from '@/features/dashboard/api/types'

type Props = {
  data: DashboardKpi
}
export default function DashboardKPI({ data }: Props) {
  return (
    <ul className="flex flex-col flex-wrap gap-2  text-xs">
      <li className="flex items-center">
        <p className="kpi-value">{data.totalIncidents}</p>
        <p className="kpi-label">hendelser i dag</p>
      </li>
      <li className="flex items-center ">
        <p className="kpi-value">{data.activeIncidents}</p>
        <p className="kpi-label">aktive nå</p>
      </li>
      <li className="flex items-center ">
        <p className="kpi-value">{data.mostActiveDistrict}</p>
        <p className="kpi-label">mest aktivt distrikt</p>
      </li>
      <li className="flex items-center ">
        <p className="kpi-value">{data.mostCommonCategory}</p>
        <p className="kpi-label">vanligste kategori</p>
      </li>
    </ul>
  )
}
