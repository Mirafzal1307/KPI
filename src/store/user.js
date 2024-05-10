import { login } from '@/services/user.service'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

export const useUserStore = defineStore('user', () => {
  const user = ref({})
  const loading = ref(false)
  const router = useRouter()

  const userLogin = async (userCredentials) => {
    try {
      loading.value = true

      const { data } = await login(userCredentials)

      user.value = data

      localStorage.setItem('token', user.value.token)
      // toast.success('Muaffaqiyatli kirildi', {
      //   autoClose: 4000,

      //   position: toast.POSITION.TOP_RIGHT,
      // } as ToastOptions)

      await router.replace({ name: 'employee-list' })

      return data
    } catch (error) {
      // toast.error('Xatolik sodir boldi', {
      //   autoClose: 4000,
      //   position: toast.POSITION.TOP_RIGHT,
      // } as ToastOptions)

      return error
    } finally {
      loading.value = false
    }
  }

  return {
    user,
    userLogin,
  }
})
