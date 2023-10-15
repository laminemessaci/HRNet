import { Navigate, Outlet, useLocation } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'

/**
 * Generates a function comment for the given function body.
 *
 * @param {Object} props - The props object.
 * @param {Array} props.allowedRoles - An array of allowed roles.
 *
 * @returns {JSX.Element} - The content to be rendered.
 */
const RequireAuth = ({ allowedRoles }) => {
  const location = useLocation()
  const { roles } = useAuth()

  const hasAllowedRole = roles.some((role) => allowedRoles.includes(role))
  const content = hasAllowedRole ? <Outlet /> : <Navigate to='/' state={{ from: location }} replace />

  return content
}
export default RequireAuth
