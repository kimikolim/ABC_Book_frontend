import { Box, Button, TextField, Typography } from '@mui/material'
import { Container } from '@mui/system'
import React from 'react'
import ResponsiveAppBar from '../../components/Appbar'
import { useAppSelector } from '../../redux/hooks'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Switch from '@mui/material/Switch'
import { useNavigate } from 'react-router-dom'

const UpdateBook = () => {
  const [checked, setChecked] = React.useState(true)
  const bookSelected = useAppSelector((state) => state.books.book)
  const navigate = useNavigate()

  const handleBookAvailablilty = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setChecked(event.target.checked)
  }

  const handleCancelEdit = () => {
    navigate('/books')
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
        Edit
      </Typography>

      <Container
        maxWidth="xl"
        sx={{ display: 'flex', justifyContent: 'center', marginTop: '30px' }}
      >
        <Box sx={{ width: '50%' }}>
          <Box sx={{ display: 'flex' }}>
            <TextField
              sx={{ flexGrow: 1, margin: '5px' }}
              label="Title"
              multiline
              maxRows={4}
            />
            <TextField
              sx={{ flexGrow: 1, margin: '5px' }}
              label="Author"
              multiline
              maxRows={4}
            />
          </Box>
          <Box sx={{ display: 'flex' }}>
            <TextField
              sx={{ flexGrow: 1, margin: '5px' }}
              label="Description"
              multiline
              maxRows={4}
              rows={4}
            />
          </Box>

          <Box sx={{ display: 'flex' }}>
            <TextField
              sx={{ flexGrow: 1, margin: '5px' }}
              label="Genre"
              multiline
              maxRows={4}
            />
            <TextField
              sx={{ flexGrow: 1, margin: '5px' }}
              label="Year Published"
              multiline
              maxRows={4}
            />
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'start' }}>
            <Box sx={{ flex: 1 }}>
              <FormControlLabel
                control={
                  <Switch
                    checked={checked}
                    onChange={handleBookAvailablilty}
                    inputProps={{ 'aria-label': 'controlled' }}
                  />
                }
                label={checked ? 'Available' : 'Unavailable'}
              />
            </Box>
            <Button sx={{ color: 'orange' }} onClick={handleCancelEdit}>Cancel</Button>
            <Button sx={{}}>Submit</Button>
          </Box>
        </Box>
      </Container>
    </>
  )
}

export default UpdateBook
