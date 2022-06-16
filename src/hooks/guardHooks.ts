import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Role } from '../models/Role'
import { isAuthorised } from '../utils/accessToken'

export const useGuard = (roles: Role[]) => {
  const navigate = useNavigate()
  useEffect(() => {
    if (isAuthorised(roles)) {
      //jwt token expired?
      // navigate('/home')
    } else {
      navigate('/login')
    }
  }, [])
}
