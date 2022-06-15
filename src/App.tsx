import { Route, Routes } from 'react-router-dom'
import './App.css'

import Homepage from './pages/analytics/Homepage'
import Books from './pages/books/Books'
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
      </Routes>
    </div>
  )
}

export default App
