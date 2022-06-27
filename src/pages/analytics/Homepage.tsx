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

  const { allBooks, availBooks, borrowedBooks } = useAppSelector((state) => state.books)
  const dispatch = useAppDispatch()
  
  React.useEffect(() => {
    dispatch(getAllBooks()) // takes time
    // dispatch(setAvailBooks())
    // dispatch(setBorrowedBooks(getCurrentUserId()))
  }, [])
  
  
  // console.log('avail', availBooks)
  // console.log('borrowed',borrowedBooks)


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
          Welcome!
        </Typography>
        <BooksCounter total={allBooks.length} availableBooks={availBooks!.length} borrowedBooks={borrowedBooks!.length}/>
      </Container>
    </>
  )
}

export default Homepage
