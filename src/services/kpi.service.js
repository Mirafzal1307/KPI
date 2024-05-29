import axios from '@/plugins/axios/axios'

export async function getKpiPeriods() {
  try {
    const response = await axios.get('/kpi-periods')
    return response.data
  } catch (error) {
    console.log(error)
  }
}

export async function getKpiByRegion() {
  try {
    const response = await axios.get('/kpi-by-region')
    return response.data
  } catch (error) {
    console.log(error)
  }
}

export async function getKpiByBranches() {
  try {
    const response = await axios.get('/kpi-by-region-details')
    return response.data
  } catch (error) {
    console.log(error)
  }
}

export async function getKpiByBranchesDetails() {
  try {
    const response = await axios.get('/kpi-by-branches-details')
    return response.data
  } catch (error) {
    console.log(error)
  }
}
