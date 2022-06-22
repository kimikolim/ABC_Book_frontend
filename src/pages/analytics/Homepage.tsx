import React, { useState } from 'react'
import { Container, Typography } from '@mui/material'
import ResponsiveAppBar from '../../components/Appbar'
import { useGuard } from '../../hooks/guardHooks'
import { Role } from '../../models/Role'
import BooksCounter from './BooksCounter'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { getAllBooks } from '../../redux/books/booksSlice'

const Homepage = () => {
  useGuard([Role.ADMIN, Role.EDITOR, Role.MEMBER])
  const [currUserName, setCurrUserName] = useState('')

  const { allBooks } = useAppSelector((state) => state.books)
  const dispatch = useAppDispatch()
  
  React.useEffect(() => {
   dispatch(getAllBooks())
  },[])


  return (
    <>
      <ResponsiveAppBar />
      <Container maxWidth="xl">
        <Typography
          variant="h2"
          sx={{
            display: { xs: 'none', md: 'flex' },
            justifyContent: 'center',
            mt: 2,
          }}
        >
          Welcome {currUserName}!
        </Typography>
        <BooksCounter total={allBooks.length} availableBooks={10} borrowedBooks={2}/>
      </Container>
    </>
  )
}

export default Homepage
