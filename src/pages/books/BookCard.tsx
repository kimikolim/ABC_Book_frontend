import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { Box, Grid, Modal } from '@mui/material'

import { Role } from '../../models/Role'
import { getCurrentUserId, isAuthorised } from '../../utils/accessToken'
import { useAppDispatch } from '../../redux/hooks'
import React, { useEffect } from 'react'
import {
  borrowBook,
  deleteBook,
  getBookById,
  returnBook,
} from '../../redux/books/booksSlice'
import { useNavigate } from 'react-router-dom'
import { setEditBookMode } from '../../redux/books/bookEditSlice'

interface Props {
  id: string
  title: string
  description: string
  genre: string
  author: string
  yearPublished: number
  availability: boolean
  borrower?: string | null
}

const modalStyles = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}

/**
 * Checks the role of the current user
 * If is Admin or Editor, edit and delete buttons should show
 * Else, it should be hidden
 */
const BookCard: React.FC<Props> = ({
  id,
  title,
  description,
  genre,
  author,
  yearPublished,
  availability,
  borrower,
}) => {
  const [open, setOpen] = React.useState<boolean>(false)
  const [isBookOwner, setIsBookOwner] = React.useState<boolean>(false)
  const handleOpenModal = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const navigate = useNavigate()

  const dispatch = useAppDispatch()

  useEffect(() => {
    if (getCurrentUserId() === borrower) {
      setIsBookOwner(true)
    } else {
      setIsBookOwner(false)
    }
  }, [availability])

  const handleEditBook = async () => {
    dispatch(setEditBookMode())
    await dispatch(getBookById(id))
    navigate(`/book/${id}`)
  }

  const handleDeleteBook = async () => {
    await dispatch(deleteBook(id))
  }

  const handleBorrowBtn = async () => {
    await dispatch(borrowBook(id))
  }

  const handleReturnBtn = async () => {
    await dispatch(returnBook(id))
  }

  return (
    <>
      <Grid item xs={12} sm={6} md={3}>
        <Card sx={{ maxWidth: 345 }}>
          <CardContent>
            <Typography gutterBottom variant="h4" component="div">
              {title}
            </Typography>
            <Typography gutterBottom variant="body1">
              {description}
            </Typography>
          </CardContent>

          <CardActions>
            <Typography gutterBottom sx={{ flex: 1 }}>
              Status: {availability ? 'Available' : 'Unavailable'}
            </Typography>
            <Button
              size="small"
              color={availability ? 'success' : 'info'}
              disabled={!availability && !isBookOwner}
              onClick={isBookOwner ? handleReturnBtn : handleBorrowBtn}
            >
              {isBookOwner ? 'Return' : 'Borrow'}
            </Button>
          </CardActions>
          {isAuthorised([Role.ADMIN, Role.EDITOR]) && (
            <CardActions
              sx={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: '5px',
              }}
            >
              <Button size="small" onClick={handleEditBook}>
                Edit
              </Button>
              <Button size="small" color="error" onClick={handleOpenModal}>
                Delete
              </Button>
            </CardActions>
          )}
        </Card>
      </Grid>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyles}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Are you sure you want to permanently delete book - {title}
          </Typography>
          <Box
            sx={{ display: 'flex', justifyContent: 'end', marginTop: '5px' }}
          >
            <Button color="primary" onClick={handleClose}>
              Back
            </Button>
            <Button color="error" onClick={handleDeleteBook}>
              Delete
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  )
}

export default BookCard
