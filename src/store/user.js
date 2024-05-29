import { createUser, getAllUsers, getUserById, login, updateUser } from '@/services/user.service'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'
import { toast } from 'vue3-toastify'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: ref({}),
    router: useRouter(),
    loading: false,
    userList: [],
  }),
  actions: {
    async userLogin(req) {
      const res = await login(req)

      if (res.token) {
        this.router.push('/')
        localStorage.setItem('access_token', res?.token)
        toast.success('Siz ilovaga kirdingiz !', {
          autoClose: 4000,
          position: toast.POSITION.BOTTOM_CENTER,
        })
      }
      return res
    },
    async getUsers() {
      try {
        const data = await getAllUsers()
        this.userList = data
        return data
      } catch (error) {
        console.log(error)
      }
    },

    async fetchUserById(id) {
      try {
        const data = await getUserById(id)
        return data
      } catch (error) {
        console.log(error)
      }
    },

    async createUser(user) {
      try {
        const data = await createUser(user)
        return data
      } catch (error) {
        console.log(error)
      }
    },

    async updateUser(id, user) {
      try {
        const data = await updateUser(id, user)
        return data
      } catch (error) {
        console.log(error)
      }
    },
  },
})
