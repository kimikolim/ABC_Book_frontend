import { Cookies } from "react-cookie"
import jwt_decode from "jwt-decode"
import moment from "moment"
import { Role } from "../models/Role"

export const getAccessToken = () => {
  const cookies = new Cookies()
  return cookies.get("accessToken")
}
export const setAccessToken = (accessToken: string) => {
  const cookies = new Cookies()
  return cookies.set("accessToken", accessToken)
}

const decodeToken = () => {
  const accessToken = getAccessToken()
  if (accessToken) {
    return jwt_decode(accessToken)
  }
}

export const getCurrentUserRole = () => {
    var decoded: any = decodeToken()
    return decoded.role
}

export const isValidAccessToken = () => {
  try {
    var decoded: any = decodeToken()
    const currentTime = moment().unix()
    const expirationTime = decoded.exp
    const isValid = currentTime - expirationTime < 0
    return isValid //return boolean
  } catch (error) {
    return false
  }
}

export const isAuthorised = (roles: Role[]) => {
  if (!isValidAccessToken()) {
    return false
  }
  const role = getCurrentUserRole() //role
  if (roles.indexOf(role) === -1) {
    return false
  }
  return true
}

