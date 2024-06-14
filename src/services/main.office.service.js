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

export async function fetchBranchList(id) {
  try {
    const { data } = await axios.get(`branch/v1/by-region?region_id=${id}`)

    return data
  } catch (error) {
    return error
  }
}

export async function getAllDataByDepartment(id) {
  try {
    const { data } = await axios.get(`department/v1/get-by-branch/${id}`)

    return data
  } catch (error) {
    return error
  }
}

export async function getAllDataByBlock(id) {
  try {
    const { data } = await axios.get(`block/v1/get-by-branch-id/${id}`)
    return data
  } catch (error) {
    return error
  }
}

export async function getDepartmentByBlock(id) {
  try {
    const { data } = await axios.get(`department/v1/get-by-block/${id}`)
    return data
  } catch (error) {
    return error
  }
}

export async function getManagmentByDepartment(id) {
  try {
    const { data } = await axios.get(`management/v1/get-by-department-id/${id}`)
    return data
  } catch (err) {
    return err
  }
}


export async function getDivisionByManagement(id) {
  try {
    const { data } = await axios.get(`/division/v1/get-by-management-id/${id}`)
    return data
  } catch (err) {
    return err
  }

}

export async function getEmpListFull(param) {
  try {
    const data = await axios.post('employee/v1/get/by-stucture', param)
    return data
  } catch (error) {
    return error
  }
}

export async function getEmpStatistic(id) {
  try {
    const data = await axios.get(`kpi_new/v1/compare?emp_id=${id}`)

    return data
  } catch (error) {
    return error
  }
}
