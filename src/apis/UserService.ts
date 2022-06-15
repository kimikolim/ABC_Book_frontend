import axios from "axios"
import { getAccessToken } from "../utils/accessToken"


const UserService = {
  getUsers: async () => {
    try {
      const {
        data: { message, users },
      } = await axios.get("http://localhost:3001/user", {
        headers: { authorization: `Bearer ${getAccessToken()}` },
      })
      return users
    } catch (error: any) {
      console.error(error.response.data.message)
    }
  }
}

export default UserService