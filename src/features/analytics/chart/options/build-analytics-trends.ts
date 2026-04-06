import { AnalyticsTrends } from '@/features/analytics/api/types'
import { categoryColorHex } from '@/lib/category-map'
import { chartAxisBase, chartLine, chartTooltip } from '@/lib/chart-config'
import { norwegianDateFormatter } from '@/lib/norwegian-date-formatter'
import { EChartsCoreOption } from 'echarts'

export function buildAnalyticsTrends(data: AnalyticsTrends[]) {
  const counter: Record<string, Record<string, number>> = {}

  data.forEach((d) => {
    const date = norwegianDateFormatter(d.date)
    if (!counter[date]) counter[date] = {}
    if (!counter[date][d.category]) counter[date][d.category] = 0
    counter[date][d.category] += d.amount
  })

  const dates = Object.keys(counter)
  const categories = [...new Set(data.map((d) => d.category))]
  const totals = data.reduce<Record<string, number>>((acc, d) => {
    acc[d.category] = (acc[d.category] ?? 0) + d.amount
    return acc
  }, {})

  const topCategories = new Set(
    Object.entries(totals)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 6)
      .map(([cat]) => cat)
  )
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

      selected: Object.fromEntries(
        categories.map((cat) => [cat, topCategories.has(cat)])
      ),
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
      symbol: 'none',
      type: 'line' as const,
      smooth: chartLine.smooth,
      showSymbol: chartLine.showSymbol,
      lineStyle: chartLine.lineStyle,
    })),
  } satisfies EChartsCoreOption
}
