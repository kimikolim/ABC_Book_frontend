import React from 'react'
import ResponsiveAppBar from '../../components/Appbar'
import { usePermissions } from '../../hooks/authHooks'
import { Role } from '../../models/Role'

const Homepage = () => {
  usePermissions([Role.ADMIN, Role.EDITOR, Role.MEMBER])
  return (
    <>
    <ResponsiveAppBar />
      <div>this is dashboard</div>
    </>
  )
}

export default Homepage
