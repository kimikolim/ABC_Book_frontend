import React, { useState } from 'react'
import { Container, Typography } from '@mui/material'
import ResponsiveAppBar from '../../components/Appbar'
import { useGuard } from '../../hooks/guardHooks'
import { Role } from '../../models/Role'

const Homepage = () => {
  useGuard([Role.ADMIN, Role.EDITOR, Role.MEMBER])

  const [currUserName, setCurrUserName] = useState('')
 

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
          Welcome {currUserName}!
        </Typography>
      </Container>
    </>
  )
}

export default Homepage
