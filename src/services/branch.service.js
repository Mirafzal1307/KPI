import axios from '@/plugins/axios/axios'

//  Branch services
export const getAllBranches = async () => {
  const data = await axios.get('branch/v1/read/all')

  return data
}

export const getAllRegions = async () => {
  const data = await axios.get('branch/v1/read/regions')

  return data
}


export const getBranchByRegionID = async (id) => {
  const data = await axios.get(`branch/v1/by-region?region_id=${id}`)

  return data
}
