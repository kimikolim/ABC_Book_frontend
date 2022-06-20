import { Route, Routes } from 'react-router-dom'
import './App.css'

import Homepage from './pages/analytics/Homepage'
import Books from './pages/books/Books'
import UpdateBook from './pages/books/UpdateBook'
import Login from './pages/login/Login'
import UpdateUsers from './pages/users/UpdateUsers'
import Users from './pages/users/Users'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route index element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Homepage />} />
        <Route path="/books" element={<Books />} />
        <Route path="/users" element={<Users />} />

        <Route path="/book/new" element={<UpdateBook />} />
        <Route path="/book/:id" element={<UpdateBook />} />

        <Route path="/user/new" element={<UpdateUsers />} />
        <Route path="/user/:id" element={<UpdateUsers />} />
      </Routes>
    </div>
  )
}

export default App
