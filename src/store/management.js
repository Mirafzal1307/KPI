//create a store for managment store
import {
  createManagement,
  deleteManagement,
  getManagementById,
  getManagements,
  updateManagement,
} from '@/services/managements.service'
import { defineStore } from 'pinia'

export const useManagementStore = defineStore('management', {
  state: () => ({
    managements: [],
  }),
  actions: {
    async fetchManagements() {
      try {
        const data = await getManagements()
        return data
      } catch (error) {
        console.log(error)
      }
    },

    async createManagement(management) {
      try {
        const data = await createManagement(management)
        return data
      } catch (error) {
        console.log(error)
      }
    },

    async updateManagement(id, management) {
      try {
        const data = await updateManagement(id, management)
        return data
      } catch (error) {
        console.log(error)
      }
    },

    async deleteManagement(id) {
      try {
        const data = await deleteManagement(id)
        return data
      } catch (error) {
        console.log(error)
      }
    },

    async fetchManagementById(id) {
      try {
        const data = await getManagementById(id)
        return data
      } catch (error) {
        console.log(error)
      }
    },
  },
})
