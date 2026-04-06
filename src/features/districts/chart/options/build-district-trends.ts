import { chartAxisBase, chartTooltip } from '@/lib/chart-config'
import { EChartsCoreOption } from 'echarts'
import { DistrictTrend } from '../../api/types'
import { norwegianDateFormatter } from '@/lib/norwegian-date-formatter'
import { districtColors } from '@/lib/district-map'
import { replaceDistrict } from '../../replace-district'

export function buildDistrictTrends(data: DistrictTrend[]): EChartsCoreOption {
  const counter: Record<string, Record<string, number>> = {}
  data.forEach((d) => {
    const date = norwegianDateFormatter(d.date)
    const district = d.district_name
    if (!counter[date]) counter[date] = {}
    if (!counter[date][district]) counter[date][district] = 0
    counter[date][district] = d.amount
  })

  const dates = Object.keys(counter)
  const districts = [...new Set(data.map((d) => d.district_name))].sort(
    (a, b) => {
      const sumA = data
        .filter((d) => d.district_name === a)
        .reduce((acc, d) => acc + d.amount, 0)
      const sumB = data
        .filter((d) => d.district_name === b)
        .reduce((acc, d) => acc + d.amount, 0)
      return sumB - sumA
    }
  )

  const series = districts.map((district) => {
    return {
      name: replaceDistrict(district),
      type: 'line',
      itemStyle: { color: districtColors[district.toLowerCase()]?.colorHex },
      data: dates.map((date) => counter[date][district] ?? 0),
    }
  })
  return {
    tooltip: {
      show: true,
      trigger: 'axis',
      ...chartTooltip,
    },
    legend: {
      bottom: 0,
      textStyle: { color: '#6b7280', fontSize: 11 },
      icon: 'circle',
      itemWidth: 8,
      itemHeight: 8,
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
      lineStyle: { width: 2 },
      type: 'line' as const,
    })),
  } satisfies EChartsCoreOption
}
