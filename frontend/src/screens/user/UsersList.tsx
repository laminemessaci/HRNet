/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable react/no-unknown-property */
// @ts-check
import { faAdd, faEye } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import Loader from '../../components/Loader'
import UsersTable from '../../components/TableList'
import { useGetUsersQuery } from '../../features/users/usersApiSlice'
import useAuth from '../../hooks/useAuth'
import UserFormatter from '../../utils/UserFormatter'
import { columns } from '../../features/users/UsersColumn'

const UsersList: React.FC = (): JSX.Element => {
  const [search, setSearch] = useState(null)

  const { data, isLoading, isSuccess, isError, error } = useGetUsersQuery('usersList', {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  })

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
        <img className='mx-auto mt-8 w-auto h-32 ' src={'/logo192.ico'} alt='logo' />
        <h1 className='text-center text-2xl sm:text-5xl sm:mt-8 sm:mb-16 text-green-700 font-bold'> Users List</h1>
        <div className='mx-auto w-11/12'>
          <div className='sm:flex sm:items-center sm:justify-center sm:mb-12 '>
            <div className='sm:flex sm:flex-col sm:w-1/4 mb-4'>
              <h1 className='mt-4 text-xl font-semibold text-gray-900'>Users</h1>
              <p className='mt-2 text-sm text-gray-700'>A list of all the HRnet users !</p>
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
                  placeholder='Search an user'
                />
              </div>
            </div>
          </div>

          <section className='mb-20 w-full '>
            {/* // @ts-ignore 
          // @ts-expect-error */}
            <UsersTable searchResult={search} tableContent={[]} columns={columns} />
          </section>
        </div>
      </>
    )
  }

  if (isSuccess) {
    const tableContent = []
    if (users?.length > 0) {
      users?.map((user) => {
        tableContent.push(new UserFormatter(user))
      })
    }
   // console.log('tableContent: ', tableContent)

    const onSearchInput = (value) => {
     // console.log(value)
      const formatedUser = []
      const filterUser = users.filter((user) =>
        Object.keys(user).some((k) => String(user[k]).toLowerCase().includes(value.toLowerCase())),
      )
      filterUser?.forEach((element) => {
        // console.log(element)
        formatedUser.push(new UserFormatter(element))
      })
      setSearch(formatedUser)
    }

    content = (
      <>
        <img className='mx-auto mt-8 w-auto h-32 ' src={'/logo192.ico'} alt='logo' />
        <h1 className='text-center text-2xl sm:text-5xl sm:mt-8 sm:mb-16 text-green-700 font-bold'> Users List</h1>
        <div className='mx-auto w-11/12'>
          <div className='sm:flex sm:items-center sm:justify-center sm:mb-12 '>
            <div className='sm:flex sm:flex-col sm:w-1/4 mb-4'>
              <h1 className='mt-4 text-xl font-semibold text-gray-900'>Users</h1>
              <p className='mt-2 text-sm text-gray-700'>A list of all the HRnet users !</p>
            </div>

            <div className='mt-4 sm:mt-0 sm:ml-16 sm:flex h-auto sm:w-1/4'>
              <label htmlFor='firstname' className='block text-sm font-medium text-gray-700 sm:mt-3 sm:mr-4'>
                Search
              </label>
              <div className='mt-1'>
                <input
                  onChange={(e) => onSearchInput(e.target.value)}
                  type='text'
                  name='firstname'
                  id='firstname'
                  className='block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm'
                  placeholder='Search an user'
                />
              </div>
            </div>
          </div>

          <section className='mb-20 w-full '>
            <div className=' rounded-md border-2  shadow sm:mt-0 bordered w-fit'>
              <NavLink
                to='/add-user'
                className='flex w-fit items-center justify-center rounded-md border border-transparent bg-white px-8 py-3 text-base font-medium text-green-600 hover:bg-green-200 md:py-1 md:px-10 md:text-lg'
              >
                <FontAwesomeIcon className='bg-green-600  rounded' icon={faAdd} color='white' />
                &nbsp;Add User
              </NavLink>
            </div>
            {/* // @ts-ignore 
          // @ts-expect-error */}
            <UsersTable searchResult={search} tableContent={tableContent} columns={columns} />
          </section>
        </div>
      </>
    )
  }

  return content
}

export default UsersList
