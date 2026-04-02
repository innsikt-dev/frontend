export type MunicipalityIncidents = {
  amount: number
}

export type MunicipalityCommonCategory = {
  category: string
}

export type MunicipalityKPI = {
  incidents: MunicipalityIncidents[]
  commonCategory: MunicipalityCommonCategory[]
}
export type MunicipalityData = {
  municipality: Municipality
  kpi: MunicipalityKPI
}

export type Municipality = {
  id: number
  municipality_name: string
  district_name: string
}
export type MunicipalityIncidentsOverTime = {
  date: string
  amount: number
}

export type MunicipalityCategoryDistribution = {
  category: string
  amount: number
}

export type MunicipalityEvents = {
  date: string
  text: string
  category: string
  district_name: string
}
export type MunicipalityAnalytics = {
  incidentsOverTime: MunicipalityIncidentsOverTime[]
  categoryDistribution: MunicipalityCategoryDistribution[]
  events: MunicipalityEvents[]
}
