import Loader from '../../components/Loader'
import { useGetEmployeesQuery } from '../../features/EmployeesApiSlice'
import { useGetUsersQuery } from '../../features/usersApiSlice.js'
import useAuth from '../../hooks/useAuth'
import EmployeesFormat from '../../utils/EmployeeFormatter'

import { faAdd } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import EmployeesTable from '../../components/TableList'
import { columns } from './EmployeesColumn'

const EmployeesList = () => {
  const [search, setSearch] = useState(null)

  const {
    data: employees,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetEmployeesQuery('employeesList', {
    pollingInterval: 15000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  })

  // function dateFormat(seconds) {
  //   return new Date(seconds * 1000).toLocaleDateString('fr')
  // }
  const { email, isManager, isAdmin } = useAuth()
  const { users } = useGetUsersQuery('usersList', {
    selectFromResult: ({ data }) => ({
      users: data?.ids.map((id) => data?.entities[id]),
    }),
  })

  let content = null

  if (isLoading || !users?.length) content = <Loader color={'green'} type='bubbles' />

  if (isError) {
    content = content = (
      <>
        <img className='mx-auto mt-8 w-auto h-auto   ' src={'/logo192.ico'} alt='logo' width={40} height={40} />
        <h1 className='text-center text-2xl sm:text-5xl sm:mt-8 sm:mb-16 text-green-700 font-bold'> Employees List</h1>
        <div className='mx-auto w-11/12'>
          <div className='sm:flex sm:items-center sm:justify-center sm:mb-12 '>
            <div className='sm:flex sm:flex-col sm:w-1/4 mb-4'>
              <h1 className='mt-4 text-xl font-semibold text-gray-900'>Employees</h1>
              <p className='mt-2 text-sm text-gray-700'>A list of all the HRnet employees !</p>
            </div>

            <div className='mt-4 sm:mt-0 sm:ml-16 sm:flex h-auto sm:w-1/4'>
              <label htmlFor='search' className='block text-sm font-medium text-gray-700 sm:mt-3 sm:mr-4'>
                Search
              </label>
              <div className='mt-1'>
                <input
                  onChange={(e) => console.log(e.target.value)}
                  type='text'
                  name='search'
                  id='search'
                  className='block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm'
                  placeholder='Search an employee'
                />
              </div>
            </div>
          </div>

          <section className='mb-20 w-full '>
            <EmployeesTable searchResult={search} tableContent={[]} columns={columns} />
          </section>
        </div>
      </>
    )
  }

  if (isSuccess && users?.length) {
    const { ids, entities } = employees
    const currentUser = users?.find((user) => user.email === email)
    const currentUserId = currentUser?.id

    let filteredIds = []
    if (isAdmin) {
      //  console.log('isAdmin: ', isAdmin)
      filteredIds = [...ids]
    }
    if (isManager) {
      filteredIds = ids.filter((employeeId) => {
        // console.log(employeeId, entities[employeeId].user, email)
        return entities[employeeId].user == currentUserId
      })
    }

    const employesToDisplay = filteredIds?.length && filteredIds.map((employeeId) => entities[employeeId])
    // console.log('filtred: ', employesToDisplay, filteredIds)

    const tableContent = []
    if (employesToDisplay.length > 0) {
      employesToDisplay?.map((employee) => {
        tableContent.push(new EmployeesFormat(employee))
      })
    }

    const onSearchInput = (value) => {
      let formatedEmployee = []
      const filterEmployee = employesToDisplay.filter((employee) =>
        Object.keys(employee).some((k) => String(employee[k]).toLowerCase().includes(value.toLowerCase())),
      )
      filterEmployee?.forEach((element) => {
        // console.log(element)
        formatedEmployee.push(new EmployeesFormat(element))
      })
      setSearch(formatedEmployee)
    }

    content = (
      <>
        <img className='mx-auto mt-8 w-auto h-32 ' src={'/logo192.ico'} alt='logo' />
        <h1 className='text-center text-2xl sm:text-5xl sm:mt-8 sm:mb-16 text-green-700 font-bold'> Employees List</h1>
        <div className='mx-auto w-11/12'>
          <div className='sm:flex sm:items-center sm:justify-center sm:mb-12 '>
            <div className='sm:flex sm:flex-col sm:w-1/4 mb-4'>
              <h1 className='mt-4 text-xl font-semibold text-gray-900'>Employees</h1>
              <p className='mt-2 text-sm text-gray-700'>A list of all the HRnet employees !</p>
            </div>

            <div className='mt-4 sm:mt-0 sm:ml-16 sm:flex h-auto sm:w-1/4'>
              <label htmlFor='search' className='block text-sm font-medium text-gray-700 sm:mt-3 sm:mr-4'>
                Search
              </label>
              <div className='mt-1'>
                <input
                  onChange={(e) => onSearchInput(e.target.value)}
                  type='text'
                  name='search'
                  id='search'
                  className='block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm'
                  placeholder='Search an employee'
                />
              </div>
            </div>
          </div>

          <section className='mb-20 w-full '>
            <div className=' rounded-md border-2  shadow sm:mt-0 bordered w-fit'>
              <NavLink
                to='/home/new-employee'
                className='flex w-fit items-center justify-center rounded-md border border-transparent bg-white px-8 py-3 text-base font-medium text-green-600 hover:bg-green-200 md:py-1 md:px-10 md:text-lg'
              >
                <FontAwesomeIcon className='bg-green-600  rounded' icon={faAdd} color='white' />
                &nbsp;Add Employee
              </NavLink>
            </div>
            <EmployeesTable searchResult={search} tableContent={[...tableContent]} columns={columns} />
          </section>
        </div>
      </>
    )
  }
  return content
}

export default EmployeesList
