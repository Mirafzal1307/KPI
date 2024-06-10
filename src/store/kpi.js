import {
  getBranchTableData,
  getChildGraphData,
  getKpiByBranches,
  getKpiByBranchesDetails,
  getKpiByRegion,
  getKpiPeriods,
} from '@/services/kpi.service'
import { defineStore } from 'pinia'

export const useKpiStore = defineStore('kpi', {
  state: () => ({
    branchTableData: [],
    period: [],
    kpiByBranches: [],
    kpiByBranchesDetails: [],
    regionKpi: [],
    currentPeriod: '2024-04-30',
    currentUserType: 1,
    currentRegion: {},
    currentRegionId: null,
  }),
  actions: {
    async fetchBranchTableData(req) {
      try {
        const data = await getBranchTableData(req)
        this.branchTableData = data
        return data
      } catch (error) {
        console.log(error)
      }
    },

    async fetchKpiByBranchesDetails(req) {
      try {
        const data = await getKpiByBranchesDetails(req)
        this.kpiByBranchesDetails = data
        return data
      } catch (error) {
        console.log(error)
      }
    },

    async fetchKpiPeriods() {
      try {
        const data = await getKpiPeriods()

        this.period = data
        return data
      } catch (error) {
        console.log(error)
      }
    },

    async fetchKpiByBranches(req) {
      try {
        const data = await getKpiByBranches({ ...req, period: this.currentPeriod, user_type: this.currentUserType })
        this.kpiByBranches = data
        return data
      } catch (error) {
        console.log(error)
      }
    },

    async fetchKpiByRegion(req) {
      try {
        const data = await getKpiByRegion(req)
        this.regionKpi = data
        return data
      } catch (error) {
        console.log(error)
      }
    },
    async getChildGraphAnnualData(req) {
      try {
        const data = await getChildGraphData(req)
        return data
      } catch (error) {
        console.log(error)
      }
    },
  },
})
