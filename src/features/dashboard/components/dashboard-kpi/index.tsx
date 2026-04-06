import { DashboardKpi } from '../../api/types'

type Props = {
  data: DashboardKpi
}

export default function DashboardKPI({ data }: Props) {
  const mappedKpi = [
    {
      id: 1,
      label: 'Hendelser i dag',
      value: data.totalIncidents,
    },
    {
      id: 2,
      label: 'Aktive nå',
      value: data.activeIncidents,
    },
    {
      id: 3,
      label: 'Mest aktive distrikt',
      value: data.mostActiveDistrict,
    },
    {
      id: 4,
      label: 'Vanligste kategori',
      value: data.mostCommonCategory,
    },
  ]
  return (
    <ul className="flex flex-col items-start items-center gap-2  text-xs">
      {mappedKpi.map((data) => (
        <li
          className="flex justify-between w-full items-center text-content-muted text-xs px-2"
          key={data.id}
        >
          <p>{data.label}</p>
          <p className="text-content">{data.value}</p>
        </li>
      ))}
    </ul>
  )
}
