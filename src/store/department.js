import { getDepartments } from '@/services/departments.service'

export const useDepartmentStore = defineStore('department', {
  state: () => ({
    departments: [],
  }),
  actions: {
    async fetchDepartments() {
      try {
        const data = await getDepartments()
        this.departments = data
        return data
      } catch (error) {
        console.log(error)
      }
    },
  },
})
