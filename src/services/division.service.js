import axios from '@/plugins/axios/axios'

export async function getDivisions() {
  try {
    const { data } = await axios.get('/division/v1/read/all')
    return data
  } catch (error) {
    console.log(error)
  }
}

export async function getDivisionById(id) {
  try {
    const { data } = await axios.get(`/division/v1/read/${id}`)
    return data
  } catch (error) {
    console.log(error)
  }
}

export async function createDivision(division) {
  try {
    const { data } = await axios.post('/division/v1/create', division)
    return data
  } catch (error) {
    console.log(error)
  }
}

export async function updateDivision(id, division) {
  try {
    const { data } = await axios.put(`/division/v1/update/${id}`, division)
    return data
  } catch (error) {
    console.log(error)
  }
}

export async function deleteDivision(id) {
  try {
    const { data } = await axios.delete(`/division/v1/delete/${id}`)
    return data
  } catch (error) {
    console.log(error)
  }
}
