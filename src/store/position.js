import {
  createPosition,
  deletePosition,
  getPositionById,
  getPositions,
  updatePosition,
} from '@/services/position.service.js'
import { defineStore } from 'pinia'

export const usePositionStore = defineStore('position', {
  state: () => ({
    positions: [],
  }),
  actions: {
    async fetchPositions() {
      try {
        const data = await getPositions()
        this.positions = data

        return data
      } catch (error) {
        console.log(error)
      }
    },

    async createPosition(position) {
      try {
        const data = await createPosition(position)
        return data
      } catch (error) {
        console.log(error)
      }
    },

    async updatePosition(id, position) {
      try {
        const data = await updatePosition(id, position)
        return data
      } catch (error) {
        console.log(error)
      }
    },

    async deletePosition(id) {
      try {
        const data = await deletePosition(id)
        return data
      } catch (error) {
        console.log(error)
      }
    },

    async fetchPositionById(id) {
      try {
        const data = await getPositionById(id)
        return data
      } catch (error) {
        console.log(error)
      }
    },
  },
})
