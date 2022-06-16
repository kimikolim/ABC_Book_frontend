import { configureStore } from '@reduxjs/toolkit'
import booksReducer from './books/booksSlice'
import authReducer from './auth/authSlice'
import usersReducer from './users/usersSlice'

export const store = configureStore({
  reducer: {
    books: booksReducer,
    auth: authReducer,
    users: usersReducer
  }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch