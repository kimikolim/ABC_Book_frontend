import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Role } from '../models/Role'
import { isAuthorised, isValidAccessToken } from '../utils/accessToken'

export const useGuard = (roles: Role[]) => {
  const navigate = useNavigate()
  useEffect(() => {
    if (!isAuthorised(roles)) {
      if (isValidAccessToken()) {
        navigate('/home')
      } else {
        navigate('/login')
      }
    }
  })
}
