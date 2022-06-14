import axios from "axios"

export const login = async (email: string, password: string) => {
  try {
    const { data } = await axios.post("http://localhost:3001/login", {
      email: "kahoot@meme.com",
      password: "bcryptlater",
    })
    return data
  } catch (error: any) {
    console.error(error.response.data.message)
  }
}
