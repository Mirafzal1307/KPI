import axios from '@/plugins/axios/axios'

export async function getBranches() {
  try {
    const { data } = await axios.get('branch/v1/read/all')

    return data
  } catch (error) {
    console.log(error)
  }
}
