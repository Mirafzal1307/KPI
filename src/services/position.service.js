import axios from '@/plugins/axios/axios'

export async function getPositions() {
  try {
    const { data } = await axios.get('/position/v1/read/all')
    return data
  } catch (error) {
    console.log(error)
  }
}

export async function getPositionById(id) {
  try {
    const { data } = await axios.get(`/position/${id}`)
  } catch (error) {
    console.log(error)
  }
}

export async function createPosition(position) {
  try {
    const { data } = await axios.post('/position/v1/create', position)
    return data
  } catch (error) {
    console.log(error)
  }
}

export async function updatePosition(id, position) {
  try {
    const { data } = await axios.put(`/position/v1/update/${id}`, position)
    return data
  } catch (error) {
    console.log(error)
  }
}

export async function deletePosition(id) {
  try {
    const { data } = await axios.delete(`/position/v1/delete/${id}`)
    return data
  } catch (error) {
    console.log(error)
  }
}
