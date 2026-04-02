import { AnalyticsTrends } from '@/features/analytics/api/types'
import { categoryColorHex } from '@/lib/category-map'
import { chartAxisBase, chartTooltip } from '@/lib/chart-config'
import { norwegianDateFormatter } from '@/lib/norwegian-date-formatter'
import { EChartsCoreOption } from 'echarts'

export function buildTrends(data: AnalyticsTrends[]) {
  const counter: Record<string, Record<string, number>> = {}

  data.forEach((d) => {
    const date = norwegianDateFormatter(d.date)
    if (!counter[date]) counter[date] = {}
    if (!counter[date][d.category]) counter[date][d.category] = 0
    counter[date][d.category] += d.amount
  })

  const dates = Object.keys(counter)
  const categories = [...new Set(data.map((d) => d.category))]

  const series = categories.map((cat) => ({
    name: cat,
    type: 'line',
    itemStyle: { color: categoryColorHex[cat] },
    data: dates.map((date) => counter[date][cat] ?? 0),
  }))

  return {
    tooltip: {
      ...chartTooltip,
      show: true,
      trigger: 'axis',
    },
    legend: {
      data: categories,
      bottom: 0,
      textStyle: { color: '#6b7280', fontSize: 11 },
      icon: 'circle',
      itemWidth: 8,
      itemHeight: 8,
      selected: {
        Sjø: false,
        Dyr: false,
        Skadeverk: false,
        'Andre hendelser': false,
      },
    },
    grid: { top: 20, left: '3%', right: '4%', bottom: 60, containLabel: true },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: dates,
      axisLabel: { color: '#6b7280' },
      ...chartAxisBase,
    },
    yAxis: {
      type: 'value',
      axisLabel: { color: '#6b7280' },
      ...chartAxisBase,
    },
    series: series.map((s) => ({
      ...s,
      smooth: true,
      symbol: 'none',
      lineStyle: { width: 1.5 },
      type: 'line' as const,
    })),
  } satisfies EChartsCoreOption
}
