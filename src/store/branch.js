import { getAllBranches, getAllRegions ,getBranchByRegionID } from '@/services/branch.service'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { toast } from 'vue3-toastify'

export const useBranchStore = defineStore('branch', () => {
  const allBranches = ref({})
  const branches = ref({})
  const allRegions = ref({})
  const loading = ref(false)

  const getBranches = async () => {
    try {
      loading.value = true
      const { data } = await getAllBranches()
      allBranches.value = data
      branches.value = data

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

  const getRegions = async () => {
    try {
      loading.value = true
      const { data } = await getAllRegions()
      allRegions.value = data

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


  const getBranchesByRegionId = async (id) => {
    try {
      loading.value = true
      const { data } = await getBranchByRegionID(id)
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

  return {
    allBranches,
    allRegions,
    branches,
    getBranches,
    getRegions,
    getBranchesByRegionId,
  }
})
