import axios from '@/plugins/axios/axios'

export async function getManagements() {
  try {
    const { data } = await axios.get('/management/v1/read/all')
    return data
  } catch (error) {
    console.log(error)
  }
}

export async function getManagementById(id) {
  try {
    const { data } = await axios.get(`/management/${id}`)
  } catch (error) {
    console.log(error)
  }
}

export async function createManagement(management) {
  try {
    const { data } = await axios.post('/management/v1/create', management)
    return data
  } catch (error) {
    console.log(error)
  }
}

export async function updateManagement(id, management) {
  try {
    const { data } = await axios.put(`/management/v1/update/${id}`, management)
    return data
  } catch (error) {
    console.log(error)
  }
}

export async function deleteManagement(id) {
  try {
    const { data } = await axios.delete(`/management/v1/delete/${id}`)
    return data
  } catch (error) {
    console.log(error)
  }
}

export async function getManagementByDivisionId(id) {
  try {
    const { data } = await axios.get(`/management/v1/read/byDivision/${id}`)
    return data
  } catch (error) {
    console.log(error)
  }
}
