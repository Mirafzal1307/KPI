import axios from '@/plugins/axios/axios'

export async function fetchPeriodList() {
  try {
    const { data } = await axios.get('/kpi_new/v1/department-period/get')

    return data
  } catch (error) {
    return error
  }
}


export async function fetchStatistics(dataParams) {
  try {
    const { data } = await axios.get('/kpi_new/v1/department-kpi', {
      params: {
        period: dataParams.value.period,
        type: dataParams.value.type,
      },
    })

    return data
  } catch (error) {
    return error
  }
}

export async function fetchBranchList() {
  try {
    const { data } = await axios.get('/kpi_indicator_details/v1/get-branches')

    return data.branches
  } catch (error) {
    return error
  }
}
