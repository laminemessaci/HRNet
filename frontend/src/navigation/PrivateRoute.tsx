import { Navigate, Outlet } from 'react-router'
import { ActionFunction, LoaderFunction, ShouldRevalidateFunction } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectCurrentToken } from '../features/auth/authSlice'

interface RouteObject {
  path?: string
  index?: boolean
  children?: React.ReactNode
  caseSensitive?: boolean
  id?: string
  loader?: LoaderFunction
  action?: ActionFunction
  element?: React.ReactNode | null
  errorElement?: React.ReactNode | null

  shouldRevalidate?: ShouldRevalidateFunction
}

/**
 * * Private Route
 * @returns {JSX.Element}
 */
const PrivateRoute: React.FC<RouteObject> = (): JSX.Element => {
  const token = useSelector(selectCurrentToken)

  if (!token) {
    return <Navigate to='/' />
  }
  return <Outlet /> // Gets the children's routes
}

export default PrivateRoute
