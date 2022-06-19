import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import BookService from '../../apis/BookService'

export const getAllBooks = createAsyncThunk<IBook[]>(
  'books/getAllBooks',
  async (payload, thunkAPI) => {
    try {
      const { books } = await BookService.getAllBooks()
      return books
    } catch (error) {
      return thunkAPI.rejectWithValue('Something went wrong')
    }
  },
)

export const getBookById = createAsyncThunk<IBook, string>(
  'books/getBookById',
  async (payload, thunkAPI) => {
    try {
      const { book } = await BookService.getBookById(payload)
      return book
    } catch (error) {
      return thunkAPI.rejectWithValue('Something went wrong')
    }
  },
)
export const createBook = createAsyncThunk<IBook, any>(
  'books/createBook',
  async (payload, thunkAPI) => {
    try {
      const { book } = await BookService.createBook(payload)
      return book
    } catch (error) {
      return thunkAPI.rejectWithValue('Something went wrong')
    }
  },
)
export const updateBook = createAsyncThunk<IBook, any>(
  'books/updateBook',
  async ({id, data}, thunkAPI) => {
    try {
      console.log(id)
      console.log(data)
      const { book } = await BookService.updateBook(id, data)
      return book
    } catch (error) {
      return thunkAPI.rejectWithValue('Something went wrong')
    }
  },
)
export const deleteBook = createAsyncThunk<IBook, string>(
  'books/deleteBook',
  async (payload, thunkAPI) => {
    try {
      const { book } = await BookService.deleteBook(payload)
      return book
    } catch (error) {
      return thunkAPI.rejectWithValue('Something went wrong')
    }
  },
)

export interface IBook {
  id: string
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
  book?: IBook | null
  total: number
  isLoading: boolean
  errorMessage: string | null
}

const initialState: BookState = {
  allBooks: [],
  book: null,
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
    // builder.addCase(getBookById.pending, (state, action) => {})
    builder.addCase(getBookById.fulfilled, (state, action) => {
      state.book = action.payload 
    })
    // builder.addCase(getBookById.rejected, (state, action) => {})

    // builder.addCase(createBook.pending, (state, action) => {})
    builder.addCase(createBook.fulfilled, (state, action) => {
      state.allBooks = state.allBooks.concat(action.payload)
    })
    // builder.addCase(createBook.rejected, (state, action) => {})

    // builder.addCase(updateBook.pending, (state, action) => {})
    builder.addCase(updateBook.fulfilled, (state, action) => {
      const index = state.allBooks.findIndex(book => book.id === action.payload.id);
      state.allBooks[index] = {
        ...state.allBooks[index],
        ...action.payload,
      };
    })
    // builder.addCase(updateBook.rejected, (state, action) => {})

    // builder.addCase(deleteBook.pending, (state, action) => {})
    builder.addCase(deleteBook.fulfilled, (state, action) => {
      const index = state.allBooks.findIndex(({ id }) => id === action.payload.id);
      state.allBooks.splice(index, 1);
    })
    // builder.addCase(deleteBook.rejected, (state, action) => {})
  },
})

// console.log(bookSlice)

export default bookSlice.reducer
