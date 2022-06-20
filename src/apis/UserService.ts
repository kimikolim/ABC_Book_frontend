import axios from 'axios'
import { IUser } from '../redux/users/usersSlice'
import { getAccessToken } from '../utils/accessToken'

const UserService = {
  getUsers: async () => {
    try {
      const result = await axios.get('http://localhost:3001/user', {
        headers: { authorization: `Bearer ${getAccessToken()}` },
      })
      return result.data.users
    } catch (error: any) {
      console.error(error.response.data.message)
    }
  },

  getUserById: async (id: string) => {
    try {
      const { data } = await axios.get(`http://localhost:3001/user/${id}`, {
        headers: { authorization: `Bearer ${getAccessToken()}` },
      })
      return data
    } catch (error: any) {
      console.error(error.response.data.message)
    }
  },
  createUser: async (userDetails: IUser) => {
    try {
      const { data } = await axios.post(
        `http://localhost:3001/user`,
        userDetails,
        {
          headers: { authorization: `Bearer ${getAccessToken()}` },
        },
      )
      return data
    } catch (error: any) {
      console.error(error.response.data.message)
    }
  },
  updateUser: async (id:string, userDetails: IUser) => {
    try {
      const { data } = await axios.put(
        `http://localhost:3001/user/${id}`,
        userDetails,
        {
          headers: { authorization: `Bearer ${getAccessToken()}` },
        },
      )
      return data
    } catch (error: any) {
      console.error(error.response.data.message)
    }
  },
  
  removeUser: async (id: string) => {
    try {
      const { data } = await axios.delete(`http://localhost:3001/user/${id}`, {
        headers: { authorization: `Bearer ${getAccessToken()}` },
      })
      return data
    } catch (error: any) {
      console.error(error.response.data.message)
    }
  },
}

export default UserService
