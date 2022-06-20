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

export const getUserById = createAsyncThunk<IUser, string>(
  'users/getUserById',
  async (payload, thunkAPI) => {
    try {
      const { user } = await UserService.getUserById(payload)
      return user
    } catch (error) {
      return thunkAPI.rejectWithValue('Something went wrong')
    }
  },
)
export const createUser = createAsyncThunk<IUser, any>(
  'users/createUser',
  async ({ data }, thunkAPI) => {
    try {
      const { user } = await UserService.createUser(data)
      return user
    } catch (error) {
      return thunkAPI.rejectWithValue('Something went wrong')
    }
  },
)
export const updateUser = createAsyncThunk<IUser, any>(
  'users/updateUser',
  async ({ id, data }, thunkAPI) => {
    try {
      // console.log(id)
      // console.log(data)
      const { user } = await UserService.updateUser(id, data)
      return user
    } catch (error) {
      return thunkAPI.rejectWithValue('Something went wrong')
    }
  },
)
export const removeUser = createAsyncThunk<IUser, string>(
  'users/removeUser',
  async (payload, thunkAPI) => {
    try {
      const { user } = await UserService.removeUser(payload)
      return user
    } catch (error) {
      return thunkAPI.rejectWithValue('Something went wrong')
    }
  },
)

export interface IUser {
  id?: string
  name: string
  email: string
  role: Role
  password?: string
  confirmPassword?: string
}

interface UserState {
  allUsers: IUser[]
  user?: IUser | null
  total: number
  isLoading: boolean
  errorMessage: string | null
}

const initialState: UserState = {
  allUsers: [],
  user: null,
  total: 0,
  isLoading: false,
  errorMessage: null,
}

const userSlice = createSlice({
  name: 'users',
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
    // builder.addCase(getBookById.pending, (state, action) => {})
    builder.addCase(getUserById.fulfilled, (state, action) => {
      state.user = action.payload
    })
    // builder.addCase(getBookById.rejected, (state, action) => {})

    // builder.addCase(createBook.pending, (state, action) => {})
    builder.addCase(createUser.fulfilled, (state, action) => {
      state.allUsers = state.allUsers.concat(action.payload)
    })
    // builder.addCase(createBook.rejected, (state, action) => {})

    // builder.addCase(updateBook.pending, (state, action) => {})
    builder.addCase(updateUser.fulfilled, (state, action) => {
      const index = state.allUsers.findIndex(
        (user) => user.id === action.payload.id,
      )
      state.allUsers[index] = {
        ...state.allUsers[index],
        ...action.payload,
      }
    })
    // builder.addCase(updateBook.rejected, (state, action) => {})

    // builder.addCase(deleteBook.pending, (state, action) => {})
    builder.addCase(removeUser.fulfilled, (state, action) => {
      const index = state.allUsers.findIndex(
        ({ id }) => id === action.payload.id,
      )
      state.allUsers.splice(index, 1)
    })
    // builder.addCase(deleteBook.rejected, (state, action) => {})
  },
})

// console.log(bookSlice)

export default userSlice.reducer
