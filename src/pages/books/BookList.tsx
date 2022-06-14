import { Container, CssBaseline, Grid } from '@mui/material'
import React from 'react'
import BookCard from './BookCard'

const BookList = () => {
  return (
    <>
        <CssBaseline />
			<Container maxWidth="lg">
				<Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
					<BookCard />
				</Grid>
			</Container>
    </>
  )
}

export default BookList