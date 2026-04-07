import { AnalyticsCategoryDistribution } from '@/features/analytics/api/types'
import { categoryColorHex } from '@/lib/category-map'
import { chartAxisBase, chartBar, chartTooltip } from '@/lib/chart-config'
import { EChartsCoreOption } from 'echarts'

export function buildAnalyticsCategoryDistribution(
  data: AnalyticsCategoryDistribution[]
) {
  return {
    tooltip: {
      ...chartTooltip,
      axisPointer: { type: 'shadow' },
    },
    grid: { top: 30, left: '3%', right: '4%', bottom: 30, containLabel: true },
    xAxis: {
      type: 'category',
      data: data.map((d) => d.category),
      axisLabel: {
        color: '#6b7280',
        interval: 0,
        rotate: 30,
        overflow: 'truncate',
        width: 80,
      },
      ...chartAxisBase,
    },
    yAxis: {
      type: 'value',

      axisLabel: { color: '#6b7280' },

      ...chartAxisBase,
    },
    series: [
      {
        type: 'bar',
        ...chartBar,
        data: data.map((d) => ({
          value: d.amount,
          itemStyle: {
            color: categoryColorHex[d.category],
            borderRadius: chartBar.borderRadius,
          },
        })),
      },
    ],
  } satisfies EChartsCoreOption
}
