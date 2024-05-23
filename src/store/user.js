import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { toast } from 'vue3-toastify'

export const useUserStore = defineStore('user', () => {
  const user = ref({})
  const loading = ref(false)
  const router = useRouter()

  const userLogin = async userCredentials => {
    console.log(userCredentials)

    try {
      loading.value = true

      // const { data } = await login(userCredentials)

      // user.value = data
      if (userCredentials?.login == 'admin' && userCredentials?.password == '12345') {
        localStorage.setItem(
          'token',
          'sdkjgflitjghlgkhglkjhgkjerhgpiutyjfneirhppierhfpierutweiourtoweqifdsfokjdklmfowefiportiperfgngeorigi',
        )
        toast.success('Siz ilovaga kirdingiz !', {
          autoClose: 4000,
          position: toast.POSITION.TOP_RIGHT,
        })
        await router.replace({ name: 'dashboard' })
      } else {
        toast.error('Login yoki parolda xatolik bor  !', {
          autoClose: 4000,
          position: toast.POSITION.TOP_RIGHT,
        })
      }

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
