import { fetchBranchList, getDepartament } from '@/services/main.office.service'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { toast } from 'vue3-toastify'

export const useStaticsStore = defineStore('statistics', () => {
  const allBranches = ref([])
  const loading = ref(false)
  const departments = ref({})

  const getBranches = async () => {
    try {
      loading.value = true
      const data  = await fetchBranchList()
      console.log(data)
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
      console.log(data)

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
    allBranches,
    departments,
  }
})
