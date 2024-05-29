import { getBranches } from '@/services/branches.service.js'
import { defineStore } from 'pinia'
export const useBranchStore = defineStore('banches', {
  state: () => ({
    branches: [],
  }),
  actions: {
    async fetchBranches() {
      try {
        const data = await getBranches()
        this.branches = data
        return data
      } catch (error) {
        console.log(error)
      }
    },
  },
})
