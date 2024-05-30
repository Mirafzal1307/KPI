import axios from '@/plugins/axios/axios'

export async function getEmpList(page, size, branch, param, period) {
  console.log('here') 
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

export async function getEmpKpiById(id, period) {
  const data = await axios.get(`kpi_by_excel/v1/emp-data/get/${id}?period=${period}&emp_id=${id}`)

  return data
}

export async function getPersonalData(period) {
  const data = await axios.get(`kpi_new/v1/personal-monitoring?period=${period}`)

  return data
}
