import { createBlock, deleteBlock, getBlocks, updateBlock } from '@/services/block.service'
import { defineStore } from 'pinia'

export const useBlockStore = defineStore('block', {
  state: () => ({
    blocks: [],
  }),
  actions: {
    async fetchBlocks() {
      try {
        const data = await getBlocks()
        this.blocks = data

        return data
      } catch (error) {
        console.log(error)
      }
    },

    async createBlock(block) {
      try {
        const data = await createBlock(block)
        return data
      } catch (error) {
        console.log(error)
      }
    },

    async updateBlock(id, block) {
      try {
        const data = await updateBlock(id, block)
        return data
      } catch (error) {
        console.log(error)
      }
    },

    async deleteBlock(id) {
      try {
        const data = await deleteBlock(id)
        return data
      } catch (error) {
        console.log(error)
      }
    },

    async fetchBlockById(id) {
      try {
        const data = await getBlockById(id)
        return data
      } catch (error) {
        console.log(error)
      }
    },
  },
})
