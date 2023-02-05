import { Navigate, Outlet } from 'react-router'
import { ActionFunction, LoaderFunction, ShouldRevalidateFunction } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectCurrentToken } from '../features/auth/authSlice'
import NavMenu from '../components/NavMenu'
import Footer from './../components/Footer'

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
  // console.log('token private route ', token)

  if (!token) {
    console.log('token private route ', token)
    return <Navigate to='/' />
  }
  return (
    <>
      <NavMenu />
      <Outlet />
      <Footer />
    </>
  )
}

export default PrivateRoute
