import { Route, Routes } from 'react-router-dom'
import './App.css'

import Homepage from './pages/analytics/Homepage'
import AddBook from './pages/books/AddBook'
import Books from './pages/books/Books'
import UpdateBook from './pages/books/UpdateBook'
import Login from './pages/login/Login'
import Users from './pages/users/Users'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Homepage />} />
        <Route path="/books" element={<Books />} />
        <Route path="/users" element={<Users />} />

        <Route path="/addBook" element={<AddBook />} />
        <Route path="/book/:id" element={<UpdateBook />} />
      </Routes>
    </div>
  )
}

export default App
