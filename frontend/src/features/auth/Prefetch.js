import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { store } from '../../app/store'
import { employeesApiSlice } from '../EmployeesApiSlice'
import { usersApiSlice } from '../usersApiSlice'

const Prefetch = () => {
  useEffect(() => {
    store.dispatch(employeesApiSlice.util.prefetch('getEmployees', 'employeesList', { force: true }))
    store.dispatch(usersApiSlice.util.prefetch('getUsers', 'usersList', { force: true }))
  }, [])

  return <Outlet />
}
export default Prefetch
