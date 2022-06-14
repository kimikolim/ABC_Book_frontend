import { login } from "../../apis/authApiClient"
import { setAccessToken } from "../../utils/accessToken"

export const authActions = {
  login: async (username: string, password: string) => {
    try {
      //   dispatch("LOGIN_ATTEMPT")

      const { token } = await login(username, password)
      //store jwt token in cookie
      setAccessToken(token)
      //   dispatch("LOGIN_SUCCESS")
    } catch (error) {
      //   dispatch("LOGIN_FAILED", { errorMessage })
    }
  },
}
