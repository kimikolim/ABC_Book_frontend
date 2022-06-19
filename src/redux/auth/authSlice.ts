import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
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
        // console.log(thunkAPI.rejectWithValue(message));
        return thunkAPI.rejectWithValue(message)
      }
    } catch (error) {
      return thunkAPI.rejectWithValue('Something went wrong')
    }
  },
)

interface IAuthState {
  token?: string | null
  isLoading: boolean
  isError: boolean
  errorMessage: string | null
  isLoggedIn: boolean
}

const initialState: IAuthState = {
  token: null,
  isLoading: false,
  isError: false,
  isLoggedIn: false,
  errorMessage: null
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logoutAccount: (state: any, action: PayloadAction) => {
    state.isLoggedIn = false
  },},
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
      state.errorMessage = null
    })
    builder.addCase(userLogin.rejected, (state, action) => {
      state.isLoading = false
      state.isError = true
      state.isLoggedIn = false
      state.errorMessage = action.payload as string
    })
  },
})

export const { logoutAccount } = authSlice.actions;

export default authSlice.reducer
