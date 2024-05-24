import axios from '@/plugins/axios/axios'

//  Branch services
export const getAllBranches = async () => {
  const data = await axios.get('branch/v1/read/all')

  return data
}
