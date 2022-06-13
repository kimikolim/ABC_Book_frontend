import { login } from "../../apis/authApiClient"
import { setAccessToken } from "../../utils/accessToken"

export const authActions = {
  login: async (username: string, password: string) => {
    try {
      //   dispatch("LOGIN_ATTEMPT")

      const { token } = await login(username, password)
      setAccessToken(token)
      //store token in cookie
      //   dispatch("LOGIN_SUCCESS")
    } catch (error) {
      //   dispatch("LOGIN_FAILED", { errorMessage })
    }
  },
}
