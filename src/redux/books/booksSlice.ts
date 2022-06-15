import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import BookService from '../../apis/BookService'

export const getAllBooks = createAsyncThunk<IBook[]>(
  'books/getAllBooks',
  async (payload, thunkAPI) => {
    try {
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
  total: number
  isLoading: boolean
  errorMessage: string | null
}

const initialState: BookState = {
  allBooks: [],
  total: 0,
  isLoading: false,
  errorMessage: null
}

const bookSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllBooks.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addCase(getAllBooks.fulfilled, (state, action) => {
      state.isLoading = false
      state.allBooks = action.payload
      state.total = action.payload.length
    })
    builder.addCase(getAllBooks.rejected, (state, action) => {
      state.isLoading = false
      state.errorMessage = action.payload as string
    })
  },
})

// console.log(bookSlice)

export default bookSlice.reducer
