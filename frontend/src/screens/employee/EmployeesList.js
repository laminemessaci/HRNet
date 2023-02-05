import { Table } from 'antd'
import React from 'react'
import Loader from '../../components/Loader'
import { useGetEmployeesQuery } from '../../features/employees/EmployeesApiSlice'
import { useGetUsersQuery } from '../../features/users/usersApiSlice.js'
import useAuth from '../../hooks/useAuth'

const EmployeesList = () => {
  const {
    data: employees,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetEmployeesQuery('employeesList', {
    pollingInterval: 50000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  })

  // console.log(employees)
  const columns = [
    {
      key: 'firstname',
      title: 'Firstname',
      dataIndex: 'firstname',
      defaultSortOrder: 'descend',
      sortDirections: ['descend', 'ascend'],
      sorter: (a, b) => a.firstname.localeCompare(b.firstname),
    },
    {
      key: 'lastname',
      title: 'Lastname',
      dataIndex: 'lastname',
      defaultSortOrder: 'descend',
      sortDirections: ['descend', 'ascend'],
      sorter: (a, b) => a.lastname.localeCompare(b.lastname),
    },
    {
      key: 'stardate',
      title: 'Start Date',
      dataIndex: 'startdate',
      defaultSortOrder: 'descend',
      sortDirections: ['descend', 'ascend'],
      sorter: (a, b) => new Date(a.startdate) - new Date(b.startdate),
      render: (date) => dateFormat(date),
    },
    {
      key: 'department',
      title: 'Department',
      dataIndex: 'department',
      defaultSortOrder: 'descend',
      sortDirections: ['descend', 'ascend'],
      sorter: (a, b) => a.department.localeCompare(b.department),
    },
    {
      key: 'birthdate',
      title: 'Date of Birth',
      dataIndex: 'birthdate',
      defaultSortOrder: 'descend',
      sortDirections: ['descend', 'ascend'],
      sorter: (a, b) => new Date(a.birthdate) - new Date(b.birthdate),
      render: (date) => dateFormat(date),
    },
    {
      key: 'street',
      title: 'Street',
      dataIndex: 'street',
      defaultSortOrder: 'descend',
      sortDirections: ['descend', 'ascend'],
      sorter: (a, b) => a.street.localeCompare(b.street),
    },
    {
      key: 'city',
      title: 'City',
      dataIndex: 'city',
      defaultSortOrder: 'descend',
      sortDirections: ['descend', 'ascend'],
      sorter: (a, b) => a.city.localeCompare(b.city),
    },
    {
      key: 'state',
      title: 'State',
      dataIndex: 'state',
      defaultSortOrder: 'descend',
      sortDirections: ['descend', 'ascend'],
      sorter: (a, b) => a.state.localeCompare(b.state),
    },
    {
      key: 'zip',
      title: 'Zip Code',
      dataIndex: 'zip',
      defaultSortOrder: 'descend',
      sortDirections: ['descend', 'ascend'],
      sorter: (a, b) => a.zip - b.zip,
    },
  ]

  function dateFormat(seconds) {
    return new Date(seconds * 1000).toLocaleDateString('fr')
  }
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

   console.log('users', users, username)

  if (isSuccess) {
    const { ids, entities } = employees
    console.log('entities ', Object.values(entities))

    let filteredIds = []
    if (isManager || isAdmin) {
      console.log('her////////////////')
      filteredIds = [...ids]
    } else {
     
      filteredIds = ids.filter((employeeId) => {
        console.log('entities[employeeId].firstName', entities[employeeId].firstName, username)
        const currentUser = entities[employeeId].firstName.toLowerCase()
        console.log('current user', username, isManager)
        return currentUser === username
      })
    }

    console.log('filteredIds', filteredIds)
    // const tableContent = ids?.length && filteredIds.map((noteId) => <Note key={noteId} noteId={noteId} />)
    const tableContent = Object.values(entities).filter((employee) => {
      console.log(employee.user)
      return employee.user == filteredIds
    })

    console.log('tableContent', Object.values(entities))

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
                  onChange={(e) => console.log(e.target.value)}
                  type='text'
                  name='firstname'
                  id='firstname'
                  className='block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm'
                  placeholder='Search an employee'
                />
              </div>
            </div>
          </div>

          <div className='mb-20 w-full'>
            {' '}
            <Table
              dataSource={[...tableContent]}
              columns={columns}
              // size="middle"
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
          </div>
        </div>
      </>
    )
  }
  return content
}

export default EmployeesList
