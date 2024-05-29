import { getStatuses } from '@/services/status.service.js'

export const useStatusStore = defineStore('status', {
  state: () => ({
    statuses: [],
  }),
  actions: {
    async fetchStatuses() {
      try {
        const data = await getStatuses()
        this.statuses = data

        return data
      } catch (error) {
        console.log(error)
      }
    },
  },
})
