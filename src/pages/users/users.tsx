import { Container, Typography } from '@mui/material'
import React from 'react'
import ResponsiveAppBar from '../../components/Appbar'
import { useGuard } from '../../hooks/guardHooks'
import { Role } from '../../models/Role'
import UsersTable from './usersTable'

/**
 * Users Page
 * Only accessible by Admin and Editor
 * List all users
 * Only Admin can add/remove/update users
 * Features: sorting, pagination, filtering
 */

// const userColumns =  [
//   {
//       "id": "62a6da98448bd41f44e2ab96",
//       "name": "Mike Oxlong",
//       "email": "troll@lol.com",
//       "role": "MEMBER"
//   },
//   {
//       "id": "62a6dac0448bd41f44e2ab99",
//       "name": "Ben Dover",
//       "email": "kahoot@meme.com",
//       "role": "EDITOR"
//   },
//   {
//       "id": "62a6dafa448bd41f44e2ab9c",
//       "name": "Justin Case",
//       "email": "super@careful.com",
//       "role": "ADMIN"
//   }
// ]

const Users: React.FC = () => {
  useGuard([Role.ADMIN, Role.EDITOR])

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
      </Container>
      <Container maxWidth="xl" sx={{ mt: 5 }}>
        <UsersTable />
      </Container>
    </>
  )
}

export default Users
