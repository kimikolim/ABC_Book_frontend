import { Container, Typography } from '@mui/material'
import React from 'react'
import ResponsiveAppBar from '../../components/Appbar'
import { useGuard } from '../../hooks/guardHooks'
import { Role } from '../../models/Role'
import BookList from './BookList'

/**
 * Books page
 * List all Books
 * Valid logged in user can borrow/return books
 * Admin/Editor can add/remove/update book details
 * Features: sorting, pagination, filtering
 */

const Books = () => {
  useGuard([Role.ADMIN, Role.EDITOR, Role.MEMBER])
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
          Books
        </Typography>

        <BookList />
      </Container>
    </>
  )
}

export default Books
