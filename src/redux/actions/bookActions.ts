import { login } from "../../apis/authApiClient"
import { getAllBooks, getBookById, createBook, updateBook, deleteBook} from "../../apis/bookApiClient"


export const bookActions = {
  getAllBooks: async () => {
    try {
      const {message, books} = await getAllBooks()
      return books
    } catch (error) {
      //   dispatch("LOGIN_FAILED", { errorMessage })
    }
  },

  getBookById: async () => {},

  createBook: async () => {},

  updateBook: async () => {},

  deleteBook: async () => {},
}