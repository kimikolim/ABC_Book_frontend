import { AddCircleOutline } from '@mui/icons-material'
import { Box, Button, Container, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import ResponsiveAppBar from '../../components/Appbar'
import { useGuard } from '../../hooks/guardHooks'
import { Role } from '../../models/Role'
import { useAppDispatch } from '../../redux/hooks'
import { setCreateUserMode } from '../../redux/users/userEditSlice'
import UsersTable from './usersTable'

/**
 * Users Page
 * Only accessible by Admin and Editor
 * List all users
 * Only Admin can add/remove/update users
 * Features: sorting, pagination, filtering
 */

const Users: React.FC = () => {
  useGuard([Role.ADMIN, Role.EDITOR])
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleAddUserBtn = () => {
    dispatch(setCreateUserMode())
    navigate('/user/new')
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
          ABC Users
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'end', marginTop: '30px' }}>
          <Button
            variant="contained"
            color="success"
            startIcon={<AddCircleOutline />}
            onClick={handleAddUserBtn}
          >
            <Typography sx={{ display: { xs: 'none', sm: 'flex' } }}>
              Add New User
            </Typography>
          </Button>
        </Box>
      </Container>
      <Container maxWidth="xl" sx={{ mt: 5 }}>
        <UsersTable />
      </Container>
    </>
  )
}

export default Users
