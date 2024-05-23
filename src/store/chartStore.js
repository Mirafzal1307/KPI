export const useChartStore = defineStore('chart', {
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
