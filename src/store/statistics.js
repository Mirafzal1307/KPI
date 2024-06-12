import {
  fetchBranchList,
  getBlockList,
  getDepartament,
  getEmpListFull,
  getEmpStatistic,
} from '@/services/main.office.service'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { toast } from 'vue3-toastify'

export const useStaticsStore = defineStore('statistics', () => {
  const allBranches = ref([])
  const loading = ref(false)
  const departments = ref({})
  const blocks = ref({})
  const empList = ref([])
  const empStatistic = ref([])

  const getBranches = async () => {
    try {
      loading.value = true
      const data = await fetchBranchList()
      allBranches.value = data?.branches

      return data
    } catch (error) {
      toast.error('Xatolik sodir boldi', {
        autoClose: 4000,
        position: toast.POSITION.TOP_RIGHT,
      })

      return error
    } finally {
      loading.value = false
    }
  }

  const getAllDepartaments = async id => {
    try {
      loading.value = true
      const { data } = await getDepartament(id)
      departments.value = data

      return data
    } catch (error) {
      toast.error('Xatolik sodir boldi', {
        autoClose: 4000,
        position: toast.POSITION.TOP_RIGHT,
      })

      return error
    } finally {
      loading.value = false
    }
  }

  const getAllBlocks = async id => {
    try {
      loading.value = true
      const data = await getBlockList(id)
      blocks.value = data

      return data
    } catch (error) {
      toast.error('Xatolik sodir boldi', {
        autoClose: 4000,
        position: toast.POSITION.TOP_RIGHT,
      })

      return error
    } finally {
      loading.value = false
    }
  }

  const getEmpList = async param => {
    try {
      loading.value = true
      const { data } = await getEmpListFull(param)

      empList.value = data

      return data
    } catch (error) {
      toast.error('Xatolik sodir boldi', {
        autoClose: 4000,
        position: toast.POSITION.TOP_RIGHT,
      })

      return error
    } finally {
      loading.value = false
    }
  }

  const getEmpStatistics = async id => {
    try {
      loading.value = true
      const { data } = await getEmpStatistic(id)

      empStatistic.value = data

      return data
    } catch (error) {
      toast.error('Xatolik sodir boldi', {
        autoClose: 4000,
        position: toast.POSITION.TOP_RIGHT,
      })

      return error
    } finally {
      loading.value = false
    }
  }

  return {
    getBranches,
    getAllDepartaments,
    getAllBlocks,
    getEmpList,
    getEmpStatistics,
    empList,
    blocks,
    allBranches,
    departments,
    empStatistic,
  }
})