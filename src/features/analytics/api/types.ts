export type HeatMap = {
  day: number
  time: number
  amount: number
}
export type Trends = {
  date: string
  category: string
  amount: number
}

export type TopMunicipalities = {
  municipality_name: string
  amount: number
}
export type CategoryDistribution = {
  category: string
  amount: number
}

export type Analytics = {
  heatMap: HeatMap[]

  trends: Trends[]
  topMunicipalities: TopMunicipalities[]
  categoryDistribution: CategoryDistribution[]
}
