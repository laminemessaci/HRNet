import { useSelector } from 'react-redux'
import { IAuth, selectCurrentToken } from '../features/auth/authSlice'
import jwtDecode from 'jwt-decode'

export interface IUser {
  username: string
  roles: string[]
}

export interface IUserInfos {
  UserInfo: IUser
}
const useAuth = () => {
  const token = useSelector<IAuth, any>(selectCurrentToken)
  let isManager = false
  let isAdmin = false
  let status = 'Employee'

  if (token) {
    const decoded = jwtDecode<IUserInfos>(token)
    const { username, roles } = decoded.UserInfo

    isManager = roles.includes('Manager')
    isAdmin = roles.includes('Admin')

    if (isManager) status = 'Manager'
    if (isAdmin) status = 'Admin'

    return { username, roles, status, isManager, isAdmin }
  }

  return { username: '', roles: [], isManager, isAdmin, status }
}
export default useAuth
