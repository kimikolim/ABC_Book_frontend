import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Role } from "../models/Role"
import { getCurrentUserRole, isValidAccessToken } from "../utils/accessToken"

export const usePermissions = (roles: Role[]) => {
  const navigate = useNavigate()
  useEffect(() => {
    if (!isValidAccessToken()) { //jwt token expired?
      navigate("/")
    }

    const role = getCurrentUserRole() //role

    if (roles.indexOf(role) === -1) {
      navigate("/")
    }
  })
}

// ["a", "b", "c"].indexOf("a")
// 0
// ["a", "b", "c"].indexOf("b")
//1
// ["a", "b", "c"].indexOf("d")
//-1
