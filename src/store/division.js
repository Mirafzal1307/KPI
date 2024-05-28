//createa a new store module for division
import {
  createDivision,
  deleteDivision,
  getDivisionById,
  getDivisions,
  updateDivision,
} from '@/services/division.service'
import { defineStore } from 'pinia'

export const useDivisionStore = defineStore('division', {
  state: () => ({
    divisions: [],
    division: {},
  }),
  actions: {
    async fetchDivisions() {
      try {
        const data = await getDivisions()
        return data
      } catch (error) {
        console.log(error)
      }
    },
    async fetchDivisionById(id) {
      try {
        const data = await getDivisionById(id)
        return data
      } catch (error) {
        console.log(error)
      }
    },
    async createDivision(division) {
      try {
        const data = await createDivision(division)
        return data
      } catch (error) {
        console.log(error)
      }
    },
    async updateDivision(id, division) {
      try {
        const data = await updateDivision(id, division)
        return data
      } catch (error) {
        console.log(error)
      }
    },
    async deleteDivision(id) {
      try {
        const data = await deleteDivision(id)
        return data
      } catch (error) {
        console.log(error)
      }
    },
  },
})
