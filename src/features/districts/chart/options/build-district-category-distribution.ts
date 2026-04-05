import { EChartsCoreOption } from 'echarts'
import { DistrictCategoryDistribution } from '../../api/types'
import {
  chartAxisBase,
  chartGrid,
  chartTooltip,
  chartColors,
  chartBar,
} from '@/lib/chart-config'

export function buildDistrictCategoryDistribution(
  data: DistrictCategoryDistribution[]
): EChartsCoreOption {
  const categories = data.map((d) => d.category)

  return {
    tooltip: {
      trigger: 'axis',
      ...chartTooltip,
    },
    grid: { containLabel: true, ...chartGrid },
    xAxis: {
      type: 'value',
      axisLabel: { color: '#6b7280' },
      ...chartAxisBase,
    },
    yAxis: {
      type: 'category',
      data: categories.reverse(),
      axisLabel: { color: '#6b7280' },
      ...chartAxisBase,
    },
    series: [
      {
        type: 'bar',
        barMaxWidth: chartBar.barWidth,
        itemStyle: {
          borderRadius: [
            0,
            chartBar.borderRadius[0],
            chartBar.borderRadius[1],
            0,
          ],
        },
        data: data
          .map((d) => ({
            value: d.amount,
            itemStyle: { color: chartColors.category[d.category] },
          }))
          .reverse(),
      },
    ],
  } satisfies EChartsCoreOption
}
