import axios from '@/plugins/axios/axios'

export async function getDepartments() {
  try {
    const { data } = await axios.get('department/v1/read/all')
    return data
  } catch (error) {
    console.log(error)
  }
}
