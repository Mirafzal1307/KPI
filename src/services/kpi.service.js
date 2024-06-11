import axios from '@/plugins/axios/axios'

export async function getKpiPeriods() {
  try {
    const { data } = await axios.get('/kpi_new/v1/period/get')
    return data
  } catch (error) {
    console.log(error)
  }
}

export async function getKpiByRegion(req) {
  try {
    console.log(req.period, req.user_type)
    const { data } = await axios.get(
      `/kpi_new/v1/average-by-region/get?period=${req.period}&user_type=${req.user_type}`,
    )
    return data
  } catch (error) {
    console.log(error)
  }
}

export async function getKpiByBranches(req) {
  try {
    const { data } = await axios.get(
      `/kpi_new/v1/average-by-region-branches/get?region_id=${req.region_id}&period=${req.period}&user_type=${req.user_type}`,
    )

    return data
  } catch (error) {
    console.log(error)
  }
}

export async function getBranchTableData(req) {
  try {
    const { data } = await axios.get(
      `kpi_new/v1/average-by-branches/get?period=${req.period}&user_type=${req.user_type}`,
    )

    return data
  } catch (error) {
    console.log(error)
  }
}

export async function getKpiByBranchesDetails(req) {
  try {
    const { data } = await axios.get(
      `/kpi_new/v1/details-by-branch/get?period=${req.period}&branch_id=${req.branch_id}&user_type=${req.user_type}`,
    )
    return data
  } catch (error) {
    console.log(error)
  }
}

export async function getChildGraphData(req) {
  try {
    const { data } = await axios.get(`/kpi_new/v1/branch-kpi/year?branch_id=${req.branch_id}&type=${req.user_type}`)
    return data
  } catch (error) {
    console.log(error)
  }
}

export async function getDepartmentsTbData(req) {
  try {
    const { data } = await axios.get(`/kpi_new/v1/department-kpi/year?department_id=${req.departmentId}`)
    return data
  } catch (error) {
    console.log(error)
  }
}
