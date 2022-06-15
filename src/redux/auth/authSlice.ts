import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import AuthService from '../../apis/AuthService'
import { setAccessToken } from '../../utils/accessToken'

interface ILogin {
  email: string
  password: string
}

export const userLogin = createAsyncThunk<string, ILogin>(
  'user/userLogin',
  async (payload, thunkAPI) => {
    try {
      const { token, message } = await AuthService.login(
        payload.email,
        payload.password,
      )
      //store jwt token in cookie
      if (token) {
        setAccessToken(token)
        return token
      } else {
        return thunkAPI.rejectWithValue(message)
      }
      //   dispatch("LOGIN_SUCCESS")
    } catch (error) {
      return thunkAPI.rejectWithValue('Something went wrong')
    }
  },
)

interface IAuthState {
  token?: string | null
  isLoading: boolean
  isError: boolean
  errorMessage?: string
  isLoggedIn: boolean
}

const initialState: IAuthState = {
  token: null,
  isLoading: false,
  isError: false,
  isLoggedIn: false,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(userLogin.pending, (state, action) => {
      state.isLoading = true
      state.token = action.payload
    })
    builder.addCase(userLogin.fulfilled, (state, action) => {
      state.isLoading = false
      state.token = action.payload
      state.isError = false
      state.isLoggedIn = true
    })
    builder.addCase(userLogin.rejected, (state, action) => {
      state.isLoading = false
      state.isError = true
      state.isLoggedIn = false
    })
  },
})

console.log(authSlice)

export default authSlice.reducer
