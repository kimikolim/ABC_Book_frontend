import axios from "axios"

const AuthService = {
  login: async (email: string, password: string) => {
    try {
      const { data } = await axios.post("http://localhost:3001/login", {
        email: email,
        password: password,
      })
      return data
    } catch (error: any) {
      console.error(error.response.data.message)
    }
  }
}

export default AuthService
