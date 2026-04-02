import { norwegianDateFormatter } from '@/lib/norwegian-date-formatter'
import { IncidentsOverTime } from '../../api/types'
import { chartAxisBase, chartColors } from '@/lib/chart-config'

export function buildIncidentsOverTime(data: IncidentsOverTime[]) {
  return {
    tooltip: { trigger: 'axis' },
    grid: { top: 20, left: '3%', right: '4%', bottom: 30, containLabel: true },
    xAxis: {
      type: 'category',
      data: data.map((d) => norwegianDateFormatter(d.date)),

      axisLabel: { color: '#6b7280' },
      ...chartAxisBase,
    },
    yAxis: {
      type: 'value',

      axisLabel: { color: '#6b7280' },

      ...chartAxisBase,
    },
    series: [
      {
        name: 'Hendelser',
        type: 'line',
        smooth: true,
        symbol: 'none',
        lineStyle: { width: 1.5, color: '#7c3aed' },
        itemStyle: { color: chartColors.single },
        data: data.map((d) => d.amount),
      },
    ],
  }
}
