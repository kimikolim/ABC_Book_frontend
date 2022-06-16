import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import UserService from '../../apis/UserService'
import { Role } from '../../models/Role'

export const getAllUsers = createAsyncThunk(
  'users/getAllUsers',
  async (payload, thunkAPI) => {
    try {
      const users = await UserService.getUsers()
      return users
    } catch (error) {
      return thunkAPI.rejectWithValue('Something went wrong')
    }
  },
)

export interface IUser {
    id: string
    name: string
    email: string
    role: Role
}

interface UserState {
  allUsers: IUser[]
  total: number
  isLoading: boolean
  errorMessage: string | null
}

const initialState: UserState = {
  allUsers: [],
  total: 0,
  isLoading: false,
  errorMessage: null,
}

const userSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllUsers.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addCase(getAllUsers.fulfilled, (state, action) => {
      state.isLoading = false
      state.allUsers = action.payload
      state.total = action.payload.length
    })
    builder.addCase(getAllUsers.rejected, (state, action) => {
      state.isLoading = false
      state.errorMessage = action.payload as string
    })
  },
})

// console.log(bookSlice)

export default userSlice.reducer
