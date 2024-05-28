import axios from '@/plugins/axios/axios'

export async function getBranches() {
  try {
    const { data } = await axios.get('branch/v1/read/all')

    return data
  } catch (error) {
    console.log(error)
  }
}

export async function getBranchById(id) {
  try {
    const { data } = await axios.get(`/branch/v1/read/${id}`)
    return data
  } catch (error) {
    console.log(error)
  }
}

export async function createBranch(branch) {
  try {
    const { data } = await axios.post('/branch/v1/create', branch)
    return data
  } catch (error) {
    console.log(error)
  }
}

export async function updateBranch(id, branch) {
  try {
    const { data } = await axios.put(`/branch/v1/update/${id}`, branch)
    return data
  } catch (error) {
    console.log(error)
  }
}

export async function deleteBranch(id) {
  try {
    const { data } = await axios.delete(`/branch/v1/delete/${id}`)
    return data
  } catch (error) {
    console.log(error)
  }
}
