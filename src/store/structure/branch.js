import { getAllBranches } from '@/services/structure/branch.service'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { toast } from 'vue3-toastify'

export const useBranchStore = defineStore('branch', () => {
  const allBranches = ref({})
  const loading = ref(false)
  const router = useRouter()

  const getBranches = async () => {
    try {
      loading.value = true
      const { data } = await getAllBranches()
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
    getBranches,
  }
})
