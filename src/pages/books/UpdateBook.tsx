import { Box, Button, TextField, Typography } from '@mui/material'
import { Container } from '@mui/system'
import React, { useEffect, useState } from 'react'
import ResponsiveAppBar from '../../components/Appbar'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import FormControlLabel from '@mui/material/FormControlLabel'
import Switch from '@mui/material/Switch'
import { useNavigate, useParams } from 'react-router-dom'
import { createBook, updateBook } from '../../redux/books/booksSlice'
import { useGuard } from '../../hooks/guardHooks'
import { Role } from '../../models/Role'

const UpdateBook = () => {
  useGuard([Role.ADMIN, Role.EDITOR])
  const bookSelected = useAppSelector((state) => state.books.book)
  const { isEdit } = useAppSelector((state) => state.edit)
  const { id } = useParams()

  const dispatch = useAppDispatch()

  useEffect(() => {
    // setIsEdit(editState)
    if (bookSelected && isEdit) {
      setTitleInput(bookSelected!.title)
      setAuthorInput(bookSelected!.author)
      setDescriptionInput(bookSelected!.description)
      setGenreInput(bookSelected!.genre)
      setYearPublished(bookSelected!.yearPublished)
      setBookAvailable(bookSelected!.availability)
      setBorrowerInput(bookSelected!.borrower as string)
    }
  }, [bookSelected, isEdit])
  /**
   * Book Form states
   */
  const [titleInput, setTitleInput] = useState<string>('')
  const [authorInput, setAuthorInput] = useState<string>('')
  const [descriptionInput, setDescriptionInput] = useState<string>('')
  const [genreInput, setGenreInput] = useState<string>('')
  const [yearPublished, setYearPublished] = useState<number>()
  const [bookAvailable, setBookAvailable] = useState<boolean>(true)
  const [borrowerInput, setBorrowerInput] = useState('')

  const navigate = useNavigate()

  /**
   * Handling of form inputs fields
   */
  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitleInput(event.target.value)
  }

  const handleAuthorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAuthorInput(event.target.value)
  }

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setDescriptionInput(event.target.value)
  }
  const handleGenreChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGenreInput(event.target.value)
  }
  const handleYearChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setYearPublished(+event.target.value)
  }

  const handleBookAvailablilty = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    event.preventDefault()
    setBookAvailable(event.target.checked)
  }
  const handleBorrowerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBorrowerInput(event.target.value)
  }

  /**
   * Handling of Cancel and Form submission buttons
   */

  const handleCancelEdit = () => {
    navigate('/books')
  }

  const handleEditBookSubmit = async (
    event: React.SyntheticEvent<HTMLFormElement>,
  ) => {
    event.preventDefault()

    try {
      await dispatch(
        updateBook({
          id,
          data: {
            title: titleInput,
            author: authorInput,
            description: descriptionInput,
            genre: genreInput,
            yearPublished: yearPublished,
            availability: bookAvailable,
            borrower: borrowerInput,
          },
        }),
      )
      navigate('/books')
    } catch (error) {
      throw new Error('Update Book Failed')
    }
  }

  const handleNewBookSubmit = async (
    event: React.SyntheticEvent<HTMLFormElement>,
  ) => {
    event.preventDefault()
    try {
      await dispatch(
        createBook({
          data: {
            title: titleInput,
            author: authorInput,
            description: descriptionInput,
            genre: genreInput,
            yearPublished: yearPublished,
            availability: bookAvailable,
            borrower: borrowerInput,
          },
        }),
      )
      navigate('/books')
    } catch (error) {
      throw new Error('Create New Book Failed')
    }
  }

  return (
    <>
      <ResponsiveAppBar />
      <Typography
        variant="h2"
        sx={{
          display: { xs: 'none', md: 'flex' },
          justifyContent: 'center',
          mt: 2,
        }}
      >
        {isEdit ? 'Edit' : 'New Book'}
      </Typography>

      <Container
        maxWidth="xl"
        sx={{ display: 'flex', justifyContent: 'center', marginTop: '30px' }}
      >
        <form
          onSubmit={isEdit ? handleEditBookSubmit : handleNewBookSubmit}
          style={{ width: '60%' }}
        >
          <Box sx={{ display: 'flex' }}>
            <TextField
              sx={{ flexGrow: 1, margin: '5px' }}
              label="Title"
              required
              multiline
              maxRows={4}
              type="text"
              value={titleInput}
              onChange={handleTitleChange}
            />
            <TextField
              sx={{ flexGrow: 1, margin: '5px' }}
              label="Author"
              multiline
              required
              maxRows={4}
              type="text"
              value={authorInput}
              onChange={handleAuthorChange}
            />
          </Box>
          <Box sx={{ display: 'flex' }}>
            <TextField
              sx={{ flexGrow: 1, margin: '5px' }}
              label="Description"
              required
              multiline
              rows={4}
              type="text"
              value={descriptionInput}
              onChange={handleDescriptionChange}
            />
          </Box>

          <Box sx={{ display: 'flex' }}>
            <TextField
              sx={{ flexGrow: 1, margin: '5px' }}
              label="Genre"
              multiline
              required
              maxRows={4}
              type="text"
              value={genreInput}
              onChange={handleGenreChange}
            />
            <TextField
              sx={{ flexGrow: 1, margin: '5px' }}
              label="Year Published"
              type="number"
              required
              value={yearPublished}
              onChange={handleYearChange}
            />
          </Box>

          {!bookAvailable && (
            <Box sx={{ display: 'flex' }}>
              <TextField
                sx={{ flexGrow: 1, margin: '5px' }}
                label="Borrowed By"
                placeholder="Enter name of borrower"
                multiline
                rows={1}
                type="text"
                value={borrowerInput}
                onChange={handleBorrowerChange}
              />
            </Box>
          )}

          <Box sx={{ display: 'flex', justifyContent: 'start' }}>
            <Box sx={{ flex: 1 }}>
              <FormControlLabel
                control={
                  <Switch
                    checked={bookAvailable}
                    onChange={handleBookAvailablilty}
                  />
                }
                label={bookAvailable ? 'Available' : 'Unavailable'}
              />
            </Box>
            <Button sx={{ color: 'orange' }} onClick={handleCancelEdit}>
              Cancel
            </Button>
            <Button type="submit">Submit</Button>
          </Box>
        </form>
      </Container>
    </>
  )
}

export default UpdateBook
