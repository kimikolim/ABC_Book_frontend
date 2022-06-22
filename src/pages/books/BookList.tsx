import React from 'react'
import { Container, CssBaseline, Grid } from '@mui/material'
import BookCard from './BookCard'
import { useAppSelector, useAppDispatch } from '../../redux/hooks'
import { getAllBooks } from '../../redux/books/booksSlice'


const BookList = () => {
  const { allBooks } = useAppSelector((state) => state.books)
  const dispatch = useAppDispatch()
  React.useEffect(() => {
   dispatch(getAllBooks())
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <CssBaseline />
      <Container maxWidth="lg" style={{ marginTop: '3rem' }}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          {allBooks.map((b) => {
            return (
              <BookCard
                key={b.id}
                id={b.id}
                title={b.title}
                description={b.description}
                genre={b.genre}
                author={b.author}
                yearPublished={b.yearPublished}
                availability={b.availability}
                borrower={b.borrower}
              />
            )
          })}
        </Grid>
      </Container>
    </>
  )
}

export default BookList
