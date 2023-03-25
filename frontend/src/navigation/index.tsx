import React, { lazy, Suspense } from 'react'
import { ActionFunction, LoaderFunction, Route, Routes, ShouldRevalidateFunction } from 'react-router-dom'

import Loader from '../components/Loader'
import PersistLogin from '../features/auth/PersistLogin'
import Prefetch from '../features/auth/Prefetch'
import ErrorPage from './../screens/ErrorPage'
import PrivateRoute from './PrivateRoute'

import Layout from '../components/Layout'
import NewEmployee from '../screens/employee/NewEmployee'
import EditProfile from '../screens/user/EditProfile'
import NewUser from '../screens/user/NewUser'
import RequireAuth from '../features/auth/RequireAuth'
import { ROLES } from '../config/roles'
import EmployeeDash from '../screens/employee/EmployeeDash'

const Home = lazy(() => import('../screens/Home'))
const Login = lazy(() => import('../screens/Login'))
const EmployeesList = lazy(() => import('../screens/employee/EmployeesList'))
const UsersList = lazy(() => import('../screens/user/UsersList'))

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
