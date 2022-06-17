import axios from 'axios'
import { getAccessToken } from '../utils/accessToken'

interface IBook {
  id?: string
  title: string
  description: string
  genre: string
  author: string
  yearPublished: number
  availability: boolean
  borrower: string
}

const BookService = {
  getAllBooks: async () => {
    try {
      const { data } = await axios.get('http://localhost:3001/books/', {
        headers: { authorization: `Bearer ${getAccessToken()}` },
      })
      return data
    } catch (error: any) {
      console.error(error.response.data.message)
    }
  },

  getBookById: async (id: string) => {
    try {
      const { data } = await axios.get(`http://localhost:3001/books/${id}`,  {
        headers: { authorization: `Bearer ${getAccessToken()}` },
      })
      return data
    } catch (error: any) {
      console.error(error.response.data.message)
    }
  },

  createBook: async (bookDetails: IBook) => {
    try {
      const { data } = await axios.post(
        `http://localhost:3001/books/`,
        bookDetails,
        {
          headers: { authorization: `Bearer ${getAccessToken()}` },
        },
      )
      return data
    } catch (error: any) {
      console.error(error.response.data.message)
    }
  },
  // Only Admin || Editor
  updateBook: async (id: string, bookDetails: IBook) => {
    try {
      const { data } = await axios.put(
        `http://localhost:3001/books/${id}`,
        bookDetails,
        {
          headers: { authorization: `Bearer ${getAccessToken()}` },
        },
      )
      return data
    } catch (error: any) {
      console.error(error.response.data.message)
    }
  },

  // Only Admin || Editor
  deleteBook: async (id: string) => {
    try {
      const { data } = await axios.delete(`http://localhost:3001/books/${id}`, {
        headers: { authorization: `Bearer ${getAccessToken()}` },
      })
      return data
    } catch (error: any) {
      console.error(error.response.data.message)
    }
  },
}

export default BookService

// Only Admin || Editor

// Borrow Logic Here
