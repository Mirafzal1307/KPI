import axios from '@/plugins/axios/axios'

export async function getBlocks() {
  try {
    const { data } = await axios.get('/block/v1/read/all')
    return data
  } catch (error) {
    console.log(error)
  }
}

export async function getBlockById(id) {
  try {
    const { data } = await axios.get(`/blocks/${id}`)
  } catch (error) {
    console.log(error)
  }
}

export async function createBlock(block) {
  try {
    const { data } = await axios.post('/blocks', block)
    return data
  } catch (error) {
    console.log(error)
  }
}

export async function updateBlock(id, block) {
  try {
    const { data } = await axios.put(`/blocks/${id}`, block)
    return data
  } catch (error) {
    console.log(error)
  }
}

export async function deleteBlock(id) {
  try {
    const { data } = await axios.delete(`/blocks/${id}`)
    return data
  } catch (error) {
    console.log(error)
  }
}
