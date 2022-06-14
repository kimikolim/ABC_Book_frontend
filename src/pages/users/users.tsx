import React from "react"
import { usePermissions } from "../../hooks/authHooks"
import { Role } from "../../models/Role"

/**
 * Users Page
 * Only accessible by Admin and Editor
 * List all users
 * Only Admin can add/remove/update users
 * Features: sorting, pagination, filtering
 */

const Users = () => {
usePermissions([Role.ADMIN, Role.EDITOR])
  return (
    <div>Users Page</div>
  )
}

export default Users