import { Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ResponsiveAppBar from '../../components/Appbar'
import { useGuard } from '../../hooks/guardHooks'
import { Role } from '../../models/Role'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'

const UpdateUsers = () => {
  useGuard([Role.ADMIN])
  const { isEditUser } = useAppSelector((state) => state.userEdit)
  const { id } = useParams()

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    //..
  }, [])

  /**
   * User form states
   */
  const [nameInput, setNameInput] = useState('')
  const [emailInput, setEmailInput] = useState('')
  const [roleInput, setRoleInput] = useState<Role>()
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
  }

  const handleNewUserSubmit = async (
    event: React.SyntheticEvent<HTMLFormElement>,
  ) => {
    event.preventDefault()
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
        {isEditUser ? 'Edit' : 'New User'}
      </Typography>
    </>
  )
}

export default UpdateUsers
