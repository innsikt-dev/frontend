import { norwegianDateFormatter } from '@/lib/norwegian-date-formatter'
import { IncidentsOverTime } from '../../api/types'

export function buildIncidentsOverTime(data: IncidentsOverTime[]) {
  return {
    tooltip: { trigger: 'axis' },
    grid: { top: 20, left: '3%', right: '4%', bottom: 30, containLabel: true },
    xAxis: {
      type: 'category',
      data: data.map((d) => norwegianDateFormatter(d.date)),
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { color: '#6b7280' },
    },
    yAxis: {
      type: 'value',
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { color: '#6b7280' },
      splitLine: { lineStyle: { color: '#1e1c2e' } },
    },
    series: [
      {
        name: 'Hendelser',
        type: 'line',
        smooth: true,
        symbol: 'none',
        lineStyle: { width: 1.5, color: '#7c3aed' },
        itemStyle: { color: '#7c3aed' },
        data: data.map((d) => d.amount),
      },
    ],
  }
}
