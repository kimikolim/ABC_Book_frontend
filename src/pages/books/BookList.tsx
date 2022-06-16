import { Container, CssBaseline, Grid } from '@mui/material'
import React from 'react'
import BookCard from './BookCard'
import { useAppSelector, useAppDispatch } from '../../redux/hooks'
import { getAllBooks } from '../../redux/books/booksSlice'

const books = [
  {
    id: '62a8004406d6fa6a0bb4986a',
    title: 'To the mooon',
    description: 'TESLA',
    genre: 'sexy',
    author: 'Elon',
    yearPublished: 2001,
    availability: false,
    borrower: 'me',
  },
  {
    id: '62a801d10fd296b569d8a280',
    title: 'Atomic Habits',
    description:
      'Packed with evidence-based self-improvement strategies, Atomic Habits will teach you how to design habits that work for you rather than against you.',
    genre: 'self-improvement',
    author: 'James Clear',
    yearPublished: 2018,
    availability: true,
    borrower: '',
  },
  {
    id: '62a884680fd296b569d8a2ab',
    title: '100 Great Leadership Ideas',
    description:
      'Leadership is one of the most complex and demanding roles that anyone can be called on to undertake. In modern organisations executives are expected to deliver leadership from the very outset of their careers.',
    genre: 'Business',
    author: 'Jonathan Gifford',
    yearPublished: 2012,
    availability: true,
    borrower: '',
  },
  {
    id: '62a8854b0fd296b569d8a2b0',
    title: 'The art of thinking clearly',
    description:
      "These are examples of cognitive biases, simple errors we all make in our day-to-day thinking. But by knowing what they are and how to spot them, we can avoid them and make better choices - whether dealing with a personal problem or a business negotiation; trying to save money or make money; working out what we do or don't want in life - and making sure we get it.",
    genre: 'self-help',
    author: 'Rolf Dobelli',
    yearPublished: 2014,
    availability: true,
    borrower: '',
  },
]

const BookList = () => {
  const { allBooks } = useAppSelector((state) => state.books)
  const dispatch = useAppDispatch()
  React.useEffect(() => {
   dispatch(getAllBooks())
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
