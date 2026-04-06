import { categoryColorHex } from '../category-map'

export const chartTooltip = {
  backgroundColor: '#ffffff',
  borderColor: '#f3f4f6',
  borderWidth: 1,
  shadowBlur: 8,
  shadowColor: 'rgba(0,0,0,0.06)',
  textStyle: { color: '#374151', fontSize: 12 },
  axisPointer: {
    type: 'line',
    lineStyle: { color: '#e5e7eb', type: 'dashed' },
  },
}

export const chartAxisBase = {
  axisLine: { show: false },
  axisTick: { show: false },
  splitArea: { show: false },
  splitLine: { show: false },
}

export const chartTextStyle = {
  color: '#9ca3af',
  fontSize: 11,
}

export const chartGrid = {
  top: 10,
  bottom: 30,
  left: 50,
  right: 10,
}

export const chartColors = {
  heatmap: ['#eff6ff', '#93c5fd', '#1d4ed8'],
  comparison: ['#3b82f6', '#22c55e'],
  category: categoryColorHex,
  single: '#7c3aed',
}

export const chartBar = {
  borderRadius: [4, 4, 0, 0],
  barWidth: 20,
}

export const chartLine = {
  smooth: true,
  showSymbol: false,
  lineStyle: { width: 2 },
  areaStyle: {
    opacity: 0.05,
  },
}
