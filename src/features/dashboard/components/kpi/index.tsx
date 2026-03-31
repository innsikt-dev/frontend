import { DashboardKpi } from '../../api/types'

type Props = {
  data: DashboardKpi
}
export default function Kpi({ data }: Props) {
  console.log(data)
  return (
    <ul className="flex items-center gap-5">
      <li className="flex items-center gap-2">
        <p className="kpi-value">{data.totalIncidents}</p>
        <p className="kpi-label">hendelser i dag</p>
      </li>
      <li className="flex items-center gap-2">
        <p className="kpi-value">{data.activeIncidents}</p>
        <p className="kpi-label">aktive nå</p>
      </li>
      <li className="flex items-center gap-2">
        <p className="kpi-value">{data.mostActiveDistrict}</p>
        <p className="kpi-label">mest aktivt distrikt</p>
      </li>
      <li className="flex items-center gap-2">
        <p className="kpi-value">{data.mostCommonCategory}</p>
        <p className="kpi-label">vanligste kategori</p>
      </li>
    </ul>
  )
}
