import axios from '@/plugins/axios/axios'

export async function getEmpList(page, size, branch, param, period) {
  const { data } = await axios.get('kpi_by_excel/v1/emp-list/get', {
    params: {
      page,
      size,
      period,
      param,
      branch,
    },
  })

  if (!data) return

  return data
}

export async function getPeriod() {
  const { data } = await axios.get('kpi_by_excel/v1/period/get')

  if (!data) return

  return data
}

export async function getEmpKpiById(id, period) {
  const { data } = await axios.get(`kpi_by_excel/v1/emp-data/get/${id}?period=${period}&emp_id=${id}`)

  if (!data) return

  return data
}

export async function getPersonalData(period) {
  const { data } = await axios.get(`kpi_new/v1/personal-monitoring?period=${period}`)

  if (!data) return

  return
}
