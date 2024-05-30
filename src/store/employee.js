import { getEmpList , getPeriod } from '@/services/employee.service'
import { ref } from 'vue'

export const useEmployeeStore = defineStore('employee', () => {
  const loading = ref(false)
  const employeeList = ref({})
  const period = ref({})

  const getEmployeeList = async (page, size, branch, param, period) => {
    try {
      loading.value = true
      const { data } = await getEmpList(page , size , branch , param, period)
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

  return {
    loading,
    period,
    employeeList,
    getEmployeeList,
    getPeriodList
  }
})
