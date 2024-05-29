import axios from '@/plugins/axios/axios'

export async function getStatuses() {
  try {
    const { data } = await axios.get('/user-status/v1/read/all')
    return data
  } catch (error) {
    console.log(error)
  }
}

export async function getStatusById(id) {
  try {
    const { data } = await axios.get(`/user-status/${id}`)
  } catch (error) {
    console.log(error)
  }
}

export async function createStatus(status) {
  try {
    const { data } = await axios.post('/user-status/v1/create', status)
    return data
  } catch (error) {
    console.log(error)
  }
}

export async function updateStatus(id, status) {
  try {
    const { data } = await axios.put(`/user-status/v1/update/${id}`, status)
    return data
  } catch (error) {
    console.log(error)
  }
}

export async function deleteStatus(id) {
  try {
    const { data } = await axios.delete(`/user-status/v1/delete/${id}`)
    return data
  } catch (error) {
    console.log(error)
  }
}
