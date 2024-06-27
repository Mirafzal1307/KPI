import {
  fetchBranchList,
  getAllDataByDepartment,
  getAllDataByBlock,
  getDepartmentByBlock,
  getManagmentByDepartment,
  getDivisionByManagement,
  getEmpListFull,
  getEmpStatistic,
} from '@/services/main.office.service'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { toast } from 'vue3-toastify'

export const useStaticsStore = defineStore('statistics', () => {
  const allBranches = ref([])
  const loading = ref(false)
  const allData = ref({})
  const departments = ref([])
  const management = ref([])
  const divisions = ref([])
  const blocks = ref([])
  const empList = ref([])
  const empStatistic = ref([])

  const getBranches = async id => {
    try {
      loading.value = true
      const data = await fetchBranchList(id)

      allBranches.value = data

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

  const getAllDataByDepartments = async id => {
    try {
      loading.value = true
      const data = await getAllDataByDepartment(id)
      departments.value = data?.departments

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

  const getAllDataByBlocks = async id => {
    try {
      loading.value = true
      const data = await getAllDataByBlock(id)
      blocks.value = data.blocks
      management.value = data?.managements
      divisions.value = data?.divisions
      
      // allData.value = data

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

  const getDepartmentByBlocks = async id => {
    try {
      loading.value = true
      const data = await getDepartmentByBlock(id)
      allData.value = data
      departments.value = data?.departments
      divisions.value = data?.divisions
      management.value = data?.managements

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

  const getManagmentByDepartments = async id => {
    try {
      loading.value = true
      const data = await getManagmentByDepartment(id)

      allData.value = data

      management.value = data.managements
      divisions.value = data?.divisions

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

  const getDivisionsByManagments = async id => {
    try {
      loading.value = true
      const data = await getDivisionByManagement(id)
      allData.value = data
      divisions.value = data.divisions

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
    getEmpList,
    getEmpStatistics,
    getAllDataByDepartments,
    getAllDataByBlocks,
    getDepartmentByBlocks,
    getManagmentByDepartments,
    getDivisionsByManagments,
    empList,
    blocks,
    allBranches,
    departments,
    empStatistic,
    management,
    allData,
    divisions,
  }
})
