import { getAllEmp } from '@/services/employee.service'

export const use = defineStore('chart', {
  state: () => ({
    loading: false,
    docTypes: [],
    carResponse: [],
  }),
  actions: {
    async getChartData(req) {
      try {
        const data = await this.getChartData(req)
      } catch (error) {
        console.log(error)
      }
    },
  },
})
