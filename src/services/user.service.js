import axios from '@/plugins/axios/axios'

export const login = async userCredentials => {
  const { data } = await axios.post('/user/login', userCredentials)

  return data
}

export async function getAllUsers() {
  try {
    const { data } = await axios.get(
      'user/v1/read/all',
      // {
      //   page: filterData.page,
      //   size: filterData.size,
      //   name: filterData.name,
      //   branch_id: filterData.branch_id,
      //   block_id: filterData.block_id,
      //   department_id: filterData.department_id,
      // }
    )

    return data
  } catch (error) {
    console.log(error)
  }
}
