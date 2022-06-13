import React from "react"
import { usePermissions } from "../../hooks/authHooks"
import { Role } from "../../models/Role"

export default function Users() {
  usePermissions([Role.ADMIN])
  return <div>users</div>
}
