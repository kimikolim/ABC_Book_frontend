import { Button } from '@mui/material'
import React from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import './App.css'
import Dashboard from './pages/analytics/dashboard'
import Books from './pages/books/Books'
import Login from './pages/login/Login'
import Users from './pages/users/Users'

function App() {
  const navigate = useNavigate()
  const handleClick = () => {
    navigate('/users')
  }
  return (
    <div className="App">
      <Button onClick={handleClick}>GO TO Page</Button>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/analytics" element={<Dashboard />} />
        <Route path="/books" element={<Books />} />
        <Route path="/users" element={<Users />} />
      </Routes>
    </div>
  )
}

export default App
