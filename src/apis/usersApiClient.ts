import axios from "axios"
import { getAccessToken } from "../utils/accessToken"

export const getUsers = async () => {
  try {
    const {
      data: { message, users },
    } = await axios.get("http://localhost:3001/user", {
      headers: { authorization: `bearer ${getAccessToken()}` },
    })
    return users
    //cookieStore.set("accessToken", response.data.accessToken, { path: '/' })
  } catch (error: any) {
    console.error(error.response.data.message)
  }
}
