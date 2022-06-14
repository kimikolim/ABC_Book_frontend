import React from "react"
import { usePermissions } from "../../hooks/authHooks"
import { Role } from "../../models/Role"

const Dashboard = () => {
  usePermissions([Role.ADMIN, Role.EDITOR, Role.MEMBER])
  return <div>Dashboard Page</div>
}

export default Dashboard
