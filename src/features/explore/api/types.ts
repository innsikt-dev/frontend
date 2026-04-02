export type MunicipalityIncidentsOverTime = {
  municipality_name: string
  date: string
  amount: number
}

export type MunicipalityCategoryDistribution = {
  municipality_name: string
  category: string
  amount: number
}

export type MunicipalityAnalytics = {
  incidentsOverTime: MunicipalityIncidentsOverTime[]
  categoryDistribution: MunicipalityCategoryDistribution[]
}

export type MunicipalityName = {
  municipality_name: string
}

export type MunicipalityKpi = {
  municipality_name: string
  district_name: string
  total_incidents: number
  avg_per_day: number
  most_common_category: string
}
export type MunicipalityKPIResult = {
  municipalityOne: MunicipalityKpi
  municipalityTwo: MunicipalityKpi
}

export type MunicipalityParams = {
  id1: string
  id2: string
  period: string
}
