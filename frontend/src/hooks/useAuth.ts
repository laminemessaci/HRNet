import jwtDecode from 'jwt-decode'
import { useSelector } from 'react-redux'
import { IAuth, selectCurrentToken } from '../features/authSlice'

export interface IUser {
  email: string
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
    const { email, roles } = decoded.UserInfo
    // console.log('decoded', decoded.UserInfo)

    isManager = roles.includes('Manager')
    isAdmin = roles.includes('Admin')

    if (isManager) status = 'Manager'
    if (isAdmin) status = 'Admin'

    return { email, roles, status, isManager, isAdmin }
  }

  return { email: '', roles: [], isManager, isAdmin, status }
}
export default useAuth
