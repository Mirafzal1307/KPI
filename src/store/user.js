import { login } from '@/services/user.service'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: ref({}),
    router: useRouter(),
    loading: false,
  }),
  actions: {
    async userLogin(req) {
      try {
        const res = await login(req)
        console.log(res)
        localStorage.setItem('access_token', res?.token)
        toast.success('Siz ilovaga kirdingiz !', {
          autoClose: 4000,
          position: toast.POSITION.BOTTOM_CENTER,
        })
      } catch (error) {
        toast.error('Ilovaga kirishda xatolik')
      }
    },
  },
})
