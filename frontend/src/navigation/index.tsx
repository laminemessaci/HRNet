import React, { lazy, Suspense } from 'react'
import { ActionFunction, LoaderFunction, Route, Routes, ShouldRevalidateFunction } from 'react-router-dom'

import PrivateRoute from './PrivateRoute'
import ErrorPage from './../screens/ErrorPage'
import Loader from '../components/Loader'
import Prefetch from '../features/auth/Prefetch'
import PersistLogin from '../features/auth/PersistLogin'

import Layout from '../components/Layout'
import EditProfile from '../screens/user/EditProfile'
import NewEmployee from '../screens/employee/NewEmployee'
import NewUser from '../screens/user/NewUser'

const Home = lazy(() => import('../screens/Home'))
const Login = lazy(() => import('../screens/Login'))
const EmployeesList = lazy(() => import('../screens/employee/EmployeesList'))
const UsersList = lazy(() => import('../screens/user/UsersList'))
const Profile = lazy(() => import('../screens/user/Profile'))

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
        <Route path='/' element={<Layout />}>
          {/* Protected Routes */}
          <Route path='/' element={<Login />} />
          <Route element={<PersistLogin />}>
            <Route element={<Prefetch />}>
              <Route element={<PrivateRoute />}>
                <Route path='/home' element={<Home />} />
                <Route path='/home/employees-list' element={<EmployeesList />} />
                <Route path='/home/new-employee' element={<NewEmployee />} />
                <Route path='/home/users-list' element={<UsersList />} />
                <Route path='/profile' element={<Profile />} />
                <Route path='/edit-profile/:userId' element={<EditProfile />} />
                <Route path='/admin/new-user' element={<NewUser />} />
              </Route>
            </Route>
            {/* End Protected Routes */}
          </Route>
          <Route path='*' element={<ErrorPage />} />
        </Route>
      </Routes>
    </Suspense>
  )
}

export default Navigation
