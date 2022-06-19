import { AddCircleOutline } from '@mui/icons-material'
import { Box, Button, Container, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import ResponsiveAppBar from '../../components/Appbar'
import { useGuard } from '../../hooks/guardHooks'
import { Role } from '../../models/Role'
import { setCreateBookMode } from '../../redux/books/bookEditSlice'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
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
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleAddBookBtn = () => {
    dispatch(setCreateBookMode())
    navigate('/book/new')
  }

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
        <Box sx={{ display: 'flex', justifyContent: 'end', marginTop: '30px' }}>
          <Button
            variant="contained"
            color="success"
            startIcon={<AddCircleOutline />}
            onClick={handleAddBookBtn}
          >
            <Typography sx={{ display: { xs: 'none', sm: 'flex' } }}>
              Add New Book
            </Typography>
          </Button>
        </Box>

        <BookList />
      </Container>
    </>
  )
}

export default Books
