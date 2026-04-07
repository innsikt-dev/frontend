import {
  chartAxisBase,
  chartBar,
  chartColors,
  chartGrid,
  chartTooltip,
} from '@/lib/chart-config'
import { MunicipalityAnalytics } from '../../api/types'
import { EChartsCoreOption } from 'echarts'

export function buildCategoryDistribution(
  data: MunicipalityAnalytics['categoryDistribution'],
  municipalityOne: string,
  municipalityTwo: string
): EChartsCoreOption {
  const counter: Record<string, Record<string, number>> = {}

  data.forEach((d) => {
    if (!counter[d.category]) counter[d.category] = {}
    counter[d.category][d.municipality_name] = d.amount
  })

  const categories = Object.keys(counter)

  return {
    tooltip: {
      ...chartTooltip,
      trigger: 'axis',
    },
    legend: {
      bottom: 0,
      textStyle: { color: '#6b7280', fontSize: 11 },
      icon: 'circle',
      itemWidth: 8,
      itemHeight: 8,
    },
    grid: { containLabel: true, ...chartGrid },
    xAxis: {
      type: 'category',
      data: categories,
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
        name: municipalityOne,
        type: 'bar',
        itemStyle: {
          color: chartColors.comparison[0],
          borderRadius: chartBar.borderRadius,
        },
        ...chartBar,
        data: categories.map((cat) => counter[cat][municipalityOne] ?? 0),
      },
      {
        name: municipalityTwo,
        type: 'bar',
        itemStyle: {
          color: chartColors.comparison[1],
          borderRadius: chartBar.borderRadius,
        },
        ...chartBar,
        data: categories.map((cat) => counter[cat][municipalityTwo] ?? 0),
      },
    ],
  }
}
