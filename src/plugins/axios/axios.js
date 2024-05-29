// axios plugin
import axios from 'axios'
// import { useUserStore } from '@/stores/user'

axios.defaults.baseURL = 'http://172.29.64.65:8000'

axios.defaults.headers.Accept = 'application/json'
axios.defaults.headers['Content-Type'] = 'application/json'
axios.defaults.withCredentials = false

axios.interceptors.request.use(
  config => {
    const token = localStorage.getItem('access_token')
    if (token) config.headers.Authorization = `Bearer ${token}`

    return config
  },
  error => {
    return Promise.reject(error)
  },
)
axios.interceptors.response.use(
  response => response,
  error => {
    if (error.response.status === 500) {
      toast.error('Серверда хатолик!')
    }
    if (error.response.status === 401) {
      router.push('/login')
    }
    return error
  },
)

axios.interceptors.response.use(
  config => config,
  error => {
    // const { logout } = useUserStore()

    // if (error.response?.status === 400 && error.response.data?.message.includes('Already authenticated'))
    //   logout()

    // if (error.response?.status === 400 || error.response?.status === 500)
    //   toast.error(error.response.data?.message)

    // if (error.response?.status === 422)
    //   toast.error(error.response.data?.message)

    // if (error.response?.status === 401)
    //   logout()

    // if (error.message === 'Network Error')
    //   toast.error('Серверда хатолик юз берди, илтимос қайтадан уриниб кўринг')

    return error
  },
)

export default axios
