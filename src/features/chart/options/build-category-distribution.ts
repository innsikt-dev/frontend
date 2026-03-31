import { CategoryDistribution } from '@/features/analytics/api/types'
import { categoryColorHex } from '@/lib/category-map'
import { chartAxisBase, chartTooltip } from '@/lib/chart-config'
import { EChartsCoreOption } from 'echarts'

export function buildCategoryDistribution(
  data: CategoryDistribution[]
): EChartsCoreOption {
  return {
    tooltip: {
      ...chartTooltip,
      axisPointer: { type: 'shadow' },
    },
    grid: { top: 30, left: '3%', right: '4%', bottom: 30, containLabel: true },
    xAxis: {
      type: 'category',
      data: data.map((d) => d.category),

      axisLabel: { color: '#6b7280' },
      ...chartAxisBase,
    },
    yAxis: {
      type: 'value',

      axisLabel: { color: '#6b7280' },
      splitLine: { lineStyle: { color: '#1e1c2e' } },
      ...chartAxisBase,
    },
    series: [
      {
        type: 'bar',
        barMaxWidth: 48,
        data: data.map((d) => ({
          value: d.amount,
          itemStyle: {
            color: categoryColorHex[d.category],
            borderRadius: [4, 4, 0, 0],
          },
        })),
      },
    ],
  }
}
