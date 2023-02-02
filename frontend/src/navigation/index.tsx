import React, { lazy, Suspense } from 'react'
import { ActionFunction, LoaderFunction, Route, Routes, ShouldRevalidateFunction } from 'react-router-dom'
import Profile from '../screens/Profile'
import PrivateRoute from './PrivateRoute'
import ErrorPage from './../screens/ErrorPage'
import Loader from '../components/Loader'
import Prefetch from '../features/auth/Prefetch'
import PersistLogin from '../features/auth/PersistLogin'
import EmployeesList from '../features/employees/EmployeesList'
import UsersList from '../features/users/UsersList'
import NewEmployee from '../features/employees/NewEmployee'
import Layout from '../components/Layout'

const Home = lazy(() => import('../screens/Home'))
const Login = lazy(() => import('../screens/Login'))

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
    <Suspense fallback={<Loader type={'blank'} color={''} />}>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route path='/' element={<Login />} />

          {/* Protected Routes */}
          <Route element={<PersistLogin />}>
            <Route element={<Prefetch />}>
              <Route element={<PrivateRoute />}>
                <Route path='/home' element={<Home />} />
                <Route path='/home/employees-list' element={<EmployeesList />} />
                <Route path='/home/new-employee' element={<NewEmployee />} />
                <Route path='/home/users-list' element={<UsersList />} />
                {/* <Route path='/profile' element={<Profile />} /> */}
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
