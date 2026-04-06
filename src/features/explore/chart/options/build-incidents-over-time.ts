import { EChartsCoreOption } from 'echarts'
import { MunicipalityAnalytics } from '../../api/types'
import { norwegianDateFormatter } from '@/lib/norwegian-date-formatter'
import {
  chartAxisBase,
  chartColors,
  chartGrid,
  chartLine,
  chartTooltip,
} from '@/lib/chart-config'

export function buildIncidentsOverTime(
  data: MunicipalityAnalytics['incidentsOverTime'],
  municipalityOne: string,
  municipalityTwo: string
): EChartsCoreOption {
  const counter: Record<string, Record<string, number>> = {}

  data.forEach((d) => {
    const date = norwegianDateFormatter(d.date)
    const municipality = d.municipality_name
    if (!counter[date]) counter[date] = {}
    counter[date][municipality] = d.amount
  })

  const dates = Object.keys(counter)

  return {
    tooltip: { ...chartTooltip, trigger: 'axis', show: true },
    legend: {
      bottom: 0,
      textStyle: { color: '#6b7280', fontSize: 11 },
      icon: 'circle',
      itemWidth: 8,
      itemHeight: 8,
    },
    grid: { containLabel: true, ...chartGrid },
    xAxis: {
      boundaryGap: false,
      data: dates,
      axisLabel: { color: '#6b7280' },
      ...chartAxisBase,
    },
    yAxis: {
      axisLabel: { color: '#6b7280' },
      ...chartAxisBase,
    },
    series: [
      {
        name: municipalityOne,
        type: 'line',
        itemStyle: { color: chartColors.comparison[0] },
        ...chartLine,
        data: dates.map((date) => counter[date][municipalityOne] ?? 0),
      },
      {
        name: municipalityTwo,
        type: 'line',
        symbol: 'none',
        itemStyle: { color: chartColors.comparison[1] },
        ...chartLine,
        data: dates.map((date) => counter[date][municipalityTwo] ?? 0),
      },
    ],
  }
}
