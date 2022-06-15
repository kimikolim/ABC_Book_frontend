import React from 'react'
import ResponsiveAppBar from '../../components/Appbar'
import { useGuard } from '../../hooks/guardHooks'
import { Role } from '../../models/Role'

const Homepage = () => {
  useGuard([Role.ADMIN, Role.EDITOR, Role.MEMBER])
  return (
    <>
      <ResponsiveAppBar />
      <div>this is dashboard</div>
    </>
  )
}

export default Homepage
