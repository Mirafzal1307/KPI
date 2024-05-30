import axios from '@/plugins/axios/axios'

export async function getEmpList(page, size, branch, param, period) {
  const data = await axios.get('kpi_by_excel/v1/emp-list/get', {
    params: {
      page,
      size,
      period,
      param,
      branch,
    },
  })

  return data
}

export async function getPeriod() {
  const data = await axios.get('kpi_by_excel/v1/period/get')

  return data
}
