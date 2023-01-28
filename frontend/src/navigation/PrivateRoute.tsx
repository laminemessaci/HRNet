import { Navigate, Outlet } from 'react-router'
import { ActionFunction, LoaderFunction, ShouldRevalidateFunction } from 'react-router-dom'

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
  const token = 'null'
  if (!token) {
    return <Navigate to='/' />
  }
  return <Outlet /> // Gets the children's routes
}

export default PrivateRoute
