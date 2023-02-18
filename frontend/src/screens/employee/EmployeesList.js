import { Table } from 'antd'
import Loader from '../../components/Loader'
import { useGetEmployeesQuery } from '../../features/employees/EmployeesApiSlice'
import { useGetUsersQuery } from '../../features/users/usersApiSlice.js'
import useAuth from '../../hooks/useAuth'
import EmployeesFormat from '../../utils/EmployeeFormater'
import { columns } from './../../utils/constants'
import { useState } from 'react'
import { objectBuilder } from './../../utils/index'

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
  const { username, isManager, isAdmin } = useAuth()
  const { users } = useGetUsersQuery('usersList', {
    selectFromResult: ({ data }) => ({
      users: data?.ids.map((id) => data?.entities[id]),
    }),
  })

  let content

  if (isLoading || !users?.length) content = <Loader color={'green'} type='bubbles' />

  if (isError) {
    content = <p className='errmsg'>{error?.data?.message}</p>
  }

  if (isSuccess) {
    const { ids, entities } = employees

    let filteredIds = []
    if (isManager || isAdmin) {
      filteredIds = [...ids]
    } else {
      filteredIds = ids.filter((employeeId) => {
        const currentUser = entities[employeeId].firstName.toLowerCase()
        return currentUser === username
      })
    }
    const employesToDisplay = filteredIds?.length && filteredIds.map((employeeId) => entities[employeeId])

    const tableContent = []
    employesToDisplay.map((employee) => {
      tableContent.push(new EmployeesFormat(employee))
    })

    const onInputSearch = (value) => {
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

    // const handlSearch = (value) => {
    //   // console.log('desp', employesToDisplay)
    //   let f = []
    //   const arraySearch = objectBuilder(employesToDisplay)
    //   // console.log(arraySearch)
    //   const e = arraySearch.filter((word) => word.searchInput.includes(value.toLowerCase()))
    //   for (let elt of e) {
    //     f.push(new EmployeesFormat(elt.employee))
    //   }
    //   // console.log(f)
    //   setSearch(f)
    // }

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
              <label htmlFor='firstname' className='block text-sm font-medium text-gray-700 sm:mt-3 sm:mr-4'>
                Search
              </label>
              <div className='mt-1'>
                <input
                  onChange={(e) => onInputSearch(e.target.value)}
                  type='text'
                  name='firstname'
                  id='firstname'
                  className='block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm'
                  placeholder='Search an employee'
                />
              </div>
            </div>
          </div>

          <section className='mb-20 w-full '>
            {' '}
            <Table
              dataSource={search ? search : [...tableContent]}
              columns={columns}
              size='middle'
              rowKey={(data) => data.key}
              scroll={{ x: 'max-content', y: '500' }}
              pagination={{
                style: {
                  width: '100%',
                  marginBottom: '50px',
                  backgroundColor: '#BBF7D0',
                  borderRadius: '8px',
                  padding: '10px',
                  paddingLeft: '20px',
                },
                defaultPageSize: 10,
                pageSizeOptions: ['10', '25', '50', '100'],

                defaultCurrent: 1,
                showSizeChanger: true,
                position: ['topLeft'],
                showTotal: (total, range) => `Showing ${range[0]} to ${range[1]} of ${total} entries`,
              }}
            />
          </section>
        </div>
      </>
    )
  }
  return content
}

export default EmployeesList
