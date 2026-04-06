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
  municipalityTwo: string,
  showPercent: boolean = false
): EChartsCoreOption {
  const counter: Record<string, Record<string, number>> = {}
  const m1Total = data
    .filter((d) => d.municipality_name === municipalityOne)
    .reduce((acc, cur) => acc + cur.amount, 0)
  const m2Total = data
    .filter((d) => d.municipality_name === municipalityTwo)
    .reduce((acc, cur) => acc + cur.amount, 0)

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
    _xAxis: {
      type: 'category',
      data: categories,
      axisLabel: { color: '#6b7280' },
      ...chartAxisBase,
    },
    get xAxis() {
      return this._xAxis
    },
    set xAxis(value) {
      this._xAxis = value
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        color: '#6b7280',
      },
      ...chartAxisBase,
    },
    series: [
      {
        name: municipalityOne,
        type: 'bar',
        barMaxWidth: 40,
        barWidth: chartBar.barWidth,
        itemStyle: {
          color: chartColors.comparison[0],
          borderRadius: chartBar.borderRadius,
        },
        data: categories.map((cat) => {
          const raw = counter[cat][municipalityOne] ?? 0
          return showPercent ? +((raw / m1Total) * 100).toFixed(1) : raw
        }),
      },
      {
        name: municipalityTwo,
        type: 'bar',
        barMaxWidth: 40,
        barWidth: chartBar.barWidth,
        itemStyle: {
          color: chartColors.comparison[1],
          borderRadius: chartBar.borderRadius,
        },
        data: categories.map((cat) => {
          const raw = counter[cat][municipalityTwo] ?? 0
          return showPercent ? +((raw / m2Total) * 100).toFixed(1) : raw
        }),
      },
    ],
  }
}
