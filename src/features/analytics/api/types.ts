export type AnalyticsHeatMap = {
  day: number
  time: number
  amount: number
}
export type AnalyticsTrends = {
  date: string
  category: string
  amount: number
}

export type AnalyticsTopMunicipalities = {
  municipality_name: string
  amount: number
}
export type AnalyticsCategoryDistribution = {
  category: string
  amount: number
}

export type Analytics = {
  heatMap: AnalyticsHeatMap[]
  trends: AnalyticsTrends[]
  topMunicipalities: AnalyticsTopMunicipalities[]
  categoryDistribution: AnalyticsCategoryDistribution[]
}
