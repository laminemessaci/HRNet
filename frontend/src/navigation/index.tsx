import React, { lazy, Suspense } from 'react'
import { ActionFunction, LoaderFunction, Route, Routes, ShouldRevalidateFunction } from 'react-router-dom'
import { ROLES } from '../config/roles'

const Home = lazy(() => import('../screens/Home'))
const Login = lazy(() => import('../screens/Login'))
const EmployeesList = lazy(() => import('../screens/employee/EmployeesList'))
const UsersList = lazy(() => import('../screens/user/UsersList'))
const PersistLogin = lazy(() => import('../features/auth/PersistLogin'))
const PrivateRoute = lazy(() => import('./PrivateRoute'))
const Prefetch = lazy(() => import('../features/auth/Prefetch'))
const Loader = lazy(() => import('../components/Loader'))
const ErrorPage = lazy(() => import('./../screens/ErrorPage'))
const Layout = lazy(() => import('../components/Layout'))
const RequireAuth = lazy(() => import('../features/auth/RequireAuth'))
const EmployeeDash = lazy(() => import('../screens/employee/EmployeeDash'))
const NewEmployee = lazy(() => import('../screens/employee/NewEmployee'))
const EditProfile = lazy(() => import('../screens/user/EditProfile'))
const NewUser = lazy(() => import('../screens/user/NewUser'))

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
 * * Router
 * @returns {JSX.Element}
 */

const Navigation: React.FC<RouteObject> = (): JSX.Element => {
  return (
    <Suspense fallback={<Loader type='bubbles' color='green' height={200} width={200} />}>
      <Routes>
        {/* Public Routes */}
        <Route path='/' element={<Layout />}>
          <Route path='/' element={<Login />} />

          {/* Protected Routes */}
          <Route element={<PersistLogin />}>
            <Route element={<Prefetch />}>
              <Route element={<PrivateRoute />}>
                <Route element={<RequireAuth allowedRoles={[ROLES.Admin, ROLES.Manager, ROLES.Employee]} />}>
                  <Route path='edit-profile/:userId' element={<EditProfile />} />

                  <Route path='home' element={<Home />} />
                  <Route path='home'>
                    <Route path='employees-list' element={<EmployeesList />} />
                    <Route path='new-employee' element={<NewEmployee />} />
                  </Route>

                  <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
                    <Route path='admin'>
                      <Route path='home' element={<Home />} />
                      <Route path='users-list' element={<UsersList />} />
                      <Route path='new-user' element={<NewUser />} />
                    </Route>
                  </Route>
                  <Route element={<RequireAuth allowedRoles={[ROLES.Employee]} />}>
                    <Route path='user'>
                      <Route path='home' element={<EmployeeDash />} />
                    </Route>
                  </Route>
                </Route>
              </Route>
            </Route>
          </Route>
          {/* End Protected Routes */}
        </Route>
        <Route path='*' element={<ErrorPage />} />
        {/* </Route> */}
      </Routes>
    </Suspense>
  )
}

export default Navigation
