import { getEmpKpiById, getEmpList, getPeriod, getPersonalData, getSubordinate } from '@/services/employee.service'
import { ref } from 'vue'

export const useEmployeeStore = defineStore('employee', () => {
  const loading = ref(false)
  const employeeList = ref([])
  const period = ref([])
  const employee_KPI = ref({})
  const employee_list_KPI = ref({})
  const personalData = ref({})
  const subordinate = ref([])

  const getEmployeeList = async (page, size, branch, param, period) => {
    loading.value = true

    try {
      employeeList.value = await getEmpList(page, size, branch, param, period)

      // return data
    } catch (error) {
      // return error
    }

    loading.value = false
  }

  const getPeriodList = async () => {
    try {
      loading.value = true

      period.value = await getPeriod()
    } catch (error) {
      return error
    } finally {
      loading.value = false
    }
  }

  const getEmployeeKpiById = async (id, period) => {
    try {
      loading.value = true

      const data = await getEmpKpiById(id, period)

      employee_KPI.value = data

      return data
    } catch (error) {
      return error
    } finally {
      loading.value = false
    }
  }

  const getEmployeeListKpiById = async (id, period) => {
    try {
      loading.value = true

      const data = await getEmpKpiById(id, period)

      employee_list_KPI.value = data

      return data
    } catch (error) {
      return error
    } finally {
      loading.value = false
    }
  }

  const getPersonalDataByPeriod = async period => {
    try {
      loading.value = true

      const data = await getPersonalData(period)

      personalData.value = data

      return data
    } catch (error) {
      return error
    } finally {
      loading.value = false
    }
  }

  const getSubordinateAll = async () => {
    try {
      loading.value = true

      const data = await getSubordinate()
      subordinate.value = data

      return data
    } catch (error) {
      return error
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    period,
    employeeList,
    employee_KPI,
    personalData,
    subordinate,
    employee_list_KPI,
    getEmployeeList,
    getPeriodList,
    getEmployeeKpiById,
    getPersonalDataByPeriod,
    getSubordinateAll,
    getEmployeeListKpiById,
  }
})
