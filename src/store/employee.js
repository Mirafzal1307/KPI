import { getEmpKpiById, getEmpList, getPeriod, getPersonalData } from '@/services/employee.service'
import { ref } from 'vue'

export const useEmployeeStore = defineStore('employee', () => {
  const loading = ref(false)
  const employeeList = ref({})
  const period = ref({})
  const employee_KPI = ref({})
  const personalData = ref({})

  const getEmployeeList = async (page, size, branch, param, period) => {
    try {
      loading.value = true
      const { data } = await getEmpList(page, size, branch, param, period)
      employeeList.value = data

      return data
    } catch (error) {
      return error
    } finally {
      loading.value = false
    }
  }

  const getPeriodList = async () => {
    try {
      loading.value = true
      const { data } = await getPeriod()
      period.value = data

      return data
    } catch (error) {
      return error
    } finally {
      loading.value = false
    }
  }

  const getEmployeeKpiById = async (id, period) => {
    try {
      loading.value = true
      const { data } = await getEmpKpiById(id, period)
      employee_KPI.value = data

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
      const { data } = await getPersonalData(period)
      personalData.value = data

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
    getEmployeeList,
    getPeriodList,
    getEmployeeKpiById,
    getPersonalDataByPeriod,
  }
})
