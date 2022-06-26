import {
  Box,
  Button,
  Container,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ResponsiveAppBar from '../../components/Appbar'
import { useGuard } from '../../hooks/guardHooks'
import { Role } from '../../models/Role'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { createUser, updateUser } from '../../redux/users/usersSlice'

const UpdateUsers = () => {
  useGuard([Role.ADMIN])
  const { isEditUser } = useAppSelector((state) => state.userEdit)
  const userSelected = useAppSelector((state) => state.users.user)
  const { id } = useParams()
  const userRoles = Object.keys(Role).map((key) => key)

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    // console.log(userRoles);
    if (userSelected && isEditUser) {
      setNameInput(userSelected.name)
      setEmailInput(userSelected.email)
      setRoleInput(userSelected.role)
    }
  }, [userSelected, isEditUser])

  /**
   * User form states
   */
  const [nameInput, setNameInput] = useState('')
  const [emailInput, setEmailInput] = useState('')
  const [roleInput, setRoleInput] = useState<Role>(Role.MEMBER)
  const [passwordInput, setPasswordInput] = useState('')
  const [cfmPasswordInput, setCfmPasswordInput] = useState('')

  /**
   * Handling form input fields
   */

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNameInput(event.target.value)
  }
  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmailInput(event.target.value)
  }
  const handleRoleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRoleInput(event.target.value as Role)
  }
  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordInput(event.target.value)
  }
  const handleCfmPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setCfmPasswordInput(event.target.value)
  }

  /**
   * Handling of Cancel and Form submission buttons
   */

  const handleCancelUserEdit = () => {
    navigate('/users')
  }

  const handleEditUserSubmit = async (
    event: React.SyntheticEvent<HTMLFormElement>,
  ) => {
    event.preventDefault()
    try {
      await dispatch(
        updateUser({
          id,
          data: {
            name: nameInput,
            email: emailInput,
            role: roleInput,
            //   password: passwordInput,
            //   confirmPassword: cfmPasswordInput,
          },
        }),
      )
      navigate('/users')
    } catch (error) {
      throw new Error('Update User Failed')
    }
  }

  const handleNewUserSubmit = async (
    event: React.SyntheticEvent<HTMLFormElement>,
  ) => {
    event.preventDefault()
    try {
      await dispatch(
        createUser({
          data: {
            name: nameInput,
            email: emailInput,
            role: roleInput,
            password: passwordInput,
            confirmPassword: cfmPasswordInput,
          },
        }),
      )
      navigate('/users')
    } catch (error) {
      throw new Error('Create New User Failed')
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
        {isEditUser ? 'Edit User' : 'New User'}
      </Typography>

      <Container
        maxWidth="xl"
        sx={{ display: 'flex', justifyContent: 'center', marginTop: '30px' }}
      >
        <form
          onSubmit={isEditUser ? handleEditUserSubmit : handleNewUserSubmit}
          style={{ width: '60%' }}
        >
          <Box sx={{ display: 'flex' }}>
            <TextField
              sx={{ flexGrow: 1, margin: '5px' }}
              label="Name"
              required
              multiline
              maxRows={4}
              type="text"
              value={nameInput}
              onChange={handleNameChange}
            />
            <TextField
              sx={{ flexGrow: 1, margin: '5px' }}
              label="Email"
              multiline
              required
              maxRows={4}
              type="text"
              value={emailInput}
              onChange={handleEmailChange}
            />
          </Box>
          <Box sx={{ display: 'flex' }}>
            <TextField
              sx={{ flexGrow: 1, margin: '5px' }}
              label="Role"
              required
              select
              value={roleInput}
              onChange={handleRoleChange}
            >
              {userRoles.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </Box>

          {!isEditUser && (
            <Box sx={{ display: 'flex' }}>
              <TextField
                sx={{ flexGrow: 1, margin: '5px' }}
                label="Password"
                required
                type="password"
                value={passwordInput}
                onChange={handlePasswordChange}
              />
              <TextField
                sx={{ flexGrow: 1, margin: '5px' }}
                label="Confirm Password"
                type="password"
                required
                value={cfmPasswordInput}
                onChange={handleCfmPasswordChange}
              />
            </Box>
          )}

          <Box sx={{ display: 'flex', justifyContent: 'end' }}>
            <Button sx={{ color: 'orange' }} onClick={handleCancelUserEdit}>
              Cancel
            </Button>
            <Button type="submit">Submit</Button>
          </Box>
        </form>
      </Container>
    </>
  )
}

export default UpdateUsers
