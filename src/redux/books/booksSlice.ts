import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import BookService from '../../apis/BookService'

export const getAllBooks: any = createAsyncThunk<IBook[]>(
  'books/getAllBooks',
  async (payload, thunkAPI) => {
    try {
      console.log(payload)
      console.log(thunkAPI)
      console.log(thunkAPI.getState())
      const { books } = await BookService.getAllBooks()
      return books
    } catch (error) {
      return thunkAPI.rejectWithValue('something went wrong')
    }
  },
)

export interface IBook {
  id?: string
  title: string
  description: string
  genre: string
  author: string
  yearPublished: number
  availability: boolean
  borrower?: string
}

interface BookState {
  allBooks: IBook[]
  total: 0
  isLoading: boolean
}

const initialState: BookState = {
  allBooks: [],
  total: 0,
  isLoading: false,
}

const bookSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {},
  extraReducers: {
    [getAllBooks.fulfilled]: (state, action) => {
      // console.log(action);
      state.isLoading = false
      state.allBooks = action.payload
    },
  },
})

console.log(bookSlice)

export default bookSlice.reducer
