/* eslint-disable react/no-unknown-property */
import React, { useState } from 'react'
import Loader from '../../components/Loader'
import EmployeesTable from '../../components/TableList'
import { useGetUsersQuery } from '../../features/users/usersApiSlice'
import useAuth from '../../hooks/useAuth'
import EmployeesFormat from '../../utils/EmployeeFormatter'
import UserFormatter from '../../utils/UserFormatter'
import { columns } from '../../utils/UsersColumn'

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
  console.log('users: ', users, isSuccess)

  let content = null

  // if (isLoading || !users?.length) content = <Loader color={'green'} type='bubbles' />

  if (isError) {
    console.log('error$$$$$$')
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

  if (isSuccess) {
    console.log('success $$$$$$')
    // const { ids, entities } = users
    // console.log('ids: ', ids, entities)
    // const currentUser = users?.find((user) => user.email === email)
    // const currentUserId = currentUser?.id

    // let filteredIds = []
    // if (isAdmin) {
    //   //  console.log('isAdmin: ', isAdmin)
    //   filteredIds = [...ids]
    // }
    // if (isManager) {
    //   filteredIds = ids.filter((userId) => {
    //     // console.log(userId, entities[userId].user, email)
    //     return entities[userId].id == currentUserId
    //   })
    // }

    // const employesToDisplay = filteredIds?.length && filteredIds.map((userId) => entities[userId])
    // console.log('filtred: ', employesToDisplay, filteredIds)

    const tableContent = []
    if (users?.length > 0) {
      users?.map((user) => {
        tableContent.push(new UserFormatter(user))
      })
    }
    console.log('tableContent: ', tableContent)

    const onSearchInput = (value) => {
      console.log(value)
      // const formatedEmployee = []
      // const filterEmployee = employesToDisplay.filter((employee) =>
      //   Object.keys(employee).some((k) => String(employee[k]).toLowerCase().includes(value.toLowerCase())),
      // )
      // filterEmployee?.forEach((element) => {
      //   // console.log(element)
      //   formatedEmployee.push(new EmployeesFormat(element))
      // })
      // setSearch(formatedEmployee)
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
                  placeholder='Search an employee'
                />
              </div>
            </div>
          </div>

          <section className='mb-20 w-full '>
            <EmployeesTable searchResult={search} tableContent={tableContent} columns={columns} />
          </section>
        </div>
      </>
    )
  }

  return content
  // <main className='overflow-scroll rounded-lg border border-gray-200 shadow-md m-5 h-full my-16 mb-56'>
  //   <table className='w-full border-collapse bg-white text-left text-sm text-gray-500'>
  //     <thead className='bg-gray-50'>
  //       <tr>
  //         <th scope='col' className='px-6 py-4 font-medium text-gray-900'>
  //           Name
  //         </th>
  //         <th scope='col' className='px-6 py-4 font-medium text-gray-900'>
  //           State
  //         </th>
  //         <th scope='col' className='px-6 py-4 font-medium text-gray-900'>
  //           Role
  //         </th>
  //         <th scope='col' className='px-6 py-4 font-medium text-gray-900'>
  //           Team
  //         </th>
  //         <th scope='col' className='px-6 py-4 font-medium text-gray-900'></th>
  //       </tr>
  //     </thead>
  //     <tbody className='divide-y divide-gray-100 border-t border-gray-100'>
  //       <tr className='hover:bg-gray-50'>
  //         <th className='flex gap-3 px-6 py-4 font-normal text-gray-900'>
  //           <div className='relative h-10 w-10'>
  //             <img
  //               className='h-full w-full rounded-full object-cover object-center'
  //               src='https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  //               alt=''
  //             />
  //             <span className='absolute right-0 bottom-0 h-2 w-2 rounded-full bg-green-400 ring ring-white'></span>
  //           </div>
  //           <div className='text-sm'>
  //             <div className='font-medium text-gray-700'>Steven Jobs</div>
  //             <div className='text-gray-400'>jobs@sailboatui.com</div>
  //           </div>
  //         </th>
  //         <td className='px-6 py-4'>
  //           <span className='inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-green-600'>
  //             <span className='h-1.5 w-1.5 rounded-full bg-green-600'></span>
  //             Active
  //           </span>
  //         </td>
  //         <td className='px-6 py-4'>Product Designer</td>
  //         <td className='px-6 py-4'>
  //           <div className='flex gap-2'>
  //             <span className='inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-600'>
  //               Design
  //             </span>
  //             <span className='inline-flex items-center gap-1 rounded-full bg-indigo-50 px-2 py-1 text-xs font-semibold text-indigo-600'>
  //               Product
  //             </span>
  //             <span className='inline-flex items-center gap-1 rounded-full bg-violet-50 px-2 py-1 text-xs font-semibold text-violet-600'>
  //               Develop
  //             </span>
  //           </div>
  //         </td>
  //         <td className='px-6 py-4'>
  //           <div className='flex justify-end gap-4'>
  //             <a x-data="{ tooltip: 'Delete' }" href='#'>
  //               <svg
  //                 xmlns='http://www.w3.org/2000/svg'
  //                 fill='none'
  //                 viewBox='0 0 24 24'
  //                 strokeWidth='1.5'
  //                 stroke='currentColor'
  //                 className='h-6 w-6'
  //                 x-tooltip='tooltip'
  //               >
  //                 <path
  //                   strokeLinecap='round'
  //                   strokeLinejoin='round'
  //                   d='M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0'
  //                 />
  //               </svg>
  //             </a>
  //             <a x-data="{ tooltip: 'Edite' }" href='#'>
  //               <svg
  //                 xmlns='http://www.w3.org/2000/svg'
  //                 fill='none'
  //                 viewBox='0 0 24 24'
  //                 strokeWidth='1.5'
  //                 stroke='currentColor'
  //                 className='h-6 w-6'
  //                 x-tooltip='tooltip'
  //               >
  //                 <path
  //                   strokeLinecap='round'
  //                   strokeLinejoin='round'
  //                   d='M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125'
  //                 />
  //               </svg>
  //             </a>
  //           </div>
  //         </td>
  //       </tr>
  //       <tr className='hover:bg-gray-50'>
  //         <th className='flex gap-3 px-6 py-4 font-normal text-gray-900'>
  //           <div className='relative h-10 w-10'>
  //             <img
  //               className='h-full w-full rounded-full object-cover object-center'
  //               src='https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  //               alt=''
  //             />
  //             <span className='absolute right-0 bottom-0 h-2 w-2 rounded-full bg-green-400 ring ring-white'></span>
  //           </div>
  //           <div className='text-sm'>
  //             <div className='font-medium text-gray-700'>Steven Jobs</div>
  //             <div className='text-gray-400'>jobs@sailboatui.com</div>
  //           </div>
  //         </th>
  //         <td className='px-6 py-4'>
  //           <span className='inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-green-600'>
  //             <span className='h-1.5 w-1.5 rounded-full bg-green-600'></span>
  //             Active
  //           </span>
  //         </td>
  //         <td className='px-6 py-4'>Product Designer</td>
  //         <td className='px-6 py-4'>
  //           <div className='flex gap-2'>
  //             <span className='inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-600'>
  //               Design
  //             </span>
  //             <span className='inline-flex items-center gap-1 rounded-full bg-indigo-50 px-2 py-1 text-xs font-semibold text-indigo-600'>
  //               Product
  //             </span>
  //             <span className='inline-flex items-center gap-1 rounded-full bg-violet-50 px-2 py-1 text-xs font-semibold text-violet-600'>
  //               Develop
  //             </span>
  //           </div>
  //         </td>
  //         <td className='px-6 py-4'>
  //           <div className='flex justify-end gap-4'>
  //             <a x-data="{ tooltip: 'Delete' }" href='#'>
  //               <svg
  //                 xmlns='http://www.w3.org/2000/svg'
  //                 fill='none'
  //                 viewBox='0 0 24 24'
  //                 strokeWidth='1.5'
  //                 stroke='currentColor'
  //                 className='h-6 w-6'
  //                 x-tooltip='tooltip'
  //               >
  //                 <path
  //                   strokeLinecap='round'
  //                   strokeLinejoin='round'
  //                   d='M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0'
  //                 />
  //               </svg>
  //             </a>
  //             <a x-data="{ tooltip: 'Edite' }" href='#'>
  //               <svg
  //                 xmlns='http://www.w3.org/2000/svg'
  //                 fill='none'
  //                 viewBox='0 0 24 24'
  //                 strokeWidth='1.5'
  //                 stroke='currentColor'
  //                 className='h-6 w-6'
  //                 x-tooltip='tooltip'
  //               >
  //                 <path
  //                   strokeLinecap='round'
  //                   strokeLinejoin='round'
  //                   d='M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125'
  //                 />
  //               </svg>
  //             </a>
  //           </div>
  //         </td>
  //       </tr>
  //       <tr className='hover:bg-gray-50'>
  //         <th className='flex gap-3 px-6 py-4 font-normal text-gray-900'>
  //           <div className='relative h-10 w-10'>
  //             <img
  //               className='h-full w-full rounded-full object-cover object-center'
  //               src='https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  //               alt=''
  //             />
  //             <span className='absolute right-0 bottom-0 h-2 w-2 rounded-full bg-green-400 ring ring-white'></span>
  //           </div>
  //           <div className='text-sm'>
  //             <div className='font-medium text-gray-700'>Steven Jobs</div>
  //             <div className='text-gray-400'>jobs@sailboatui.com</div>
  //           </div>
  //         </th>
  //         <td className='px-6 py-4'>
  //           <span className='inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-green-600'>
  //             <span className='h-1.5 w-1.5 rounded-full bg-green-600'></span>
  //             Active
  //           </span>
  //         </td>
  //         <td className='px-6 py-4'>Product Designer</td>
  //         <td className='px-6 py-4'>
  //           <div className='flex gap-2'>
  //             <span className='inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-600'>
  //               Design
  //             </span>
  //             <span className='inline-flex items-center gap-1 rounded-full bg-indigo-50 px-2 py-1 text-xs font-semibold text-indigo-600'>
  //               Product
  //             </span>
  //             <span className='inline-flex items-center gap-1 rounded-full bg-violet-50 px-2 py-1 text-xs font-semibold text-violet-600'>
  //               Develop
  //             </span>
  //           </div>
  //         </td>
  //         <td className='px-6 py-4'>
  //           <div className='flex justify-end gap-4'>
  //             <a x-data="{ tooltip: 'Delete' }" href='#'>
  //               <svg
  //                 xmlns='http://www.w3.org/2000/svg'
  //                 fill='none'
  //                 viewBox='0 0 24 24'
  //                 strokeWidth='1.5'
  //                 stroke='currentColor'
  //                 className='h-6 w-6'
  //                 x-tooltip='tooltip'
  //               >
  //                 <path
  //                   strokeLinecap='round'
  //                   strokeLinejoin='round'
  //                   d='M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0'
  //                 />
  //               </svg>
  //             </a>
  //             <a x-data="{ tooltip: 'Edite' }" href='#'>
  //               <svg
  //                 xmlns='http://www.w3.org/2000/svg'
  //                 fill='none'
  //                 viewBox='0 0 24 24'
  //                 strokeWidth='1.5'
  //                 stroke='currentColor'
  //                 className='h-6 w-6'
  //                 x-tooltip='tooltip'
  //               >
  //                 <path
  //                   strokeLinecap='round'
  //                   strokeLinejoin='round'
  //                   d='M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125'
  //                 />
  //               </svg>
  //             </a>
  //           </div>
  //         </td>
  //       </tr>
  //       <tr className='hover:bg-gray-50'>
  //         <th className='flex gap-3 px-6 py-4 font-normal text-gray-900'>
  //           <div className='relative h-10 w-10'>
  //             <img
  //               className='h-full w-full rounded-full object-cover object-center'
  //               src='https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  //               alt=''
  //             />
  //             <span className='absolute right-0 bottom-0 h-2 w-2 rounded-full bg-green-400 ring ring-white'></span>
  //           </div>
  //           <div className='text-sm'>
  //             <div className='font-medium text-gray-700'>Steven Jobs</div>
  //             <div className='text-gray-400'>jobs@sailboatui.com</div>
  //           </div>
  //         </th>
  //         <td className='px-6 py-4'>
  //           <span className='inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-green-600'>
  //             <span className='h-1.5 w-1.5 rounded-full bg-green-600'></span>
  //             Active
  //           </span>
  //         </td>
  //         <td className='px-6 py-4'>Product Designer</td>
  //         <td className='px-6 py-4'>
  //           <div className='flex gap-2'>
  //             <span className='inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-600'>
  //               Design
  //             </span>
  //             <span className='inline-flex items-center gap-1 rounded-full bg-indigo-50 px-2 py-1 text-xs font-semibold text-indigo-600'>
  //               Product
  //             </span>
  //             <span className='inline-flex items-center gap-1 rounded-full bg-violet-50 px-2 py-1 text-xs font-semibold text-violet-600'>
  //               Develop
  //             </span>
  //           </div>
  //         </td>
  //         <td className='px-6 py-4'>
  //           <div className='flex justify-end gap-4'>
  //             <a x-data="{ tooltip: 'Delete' }" href='#'>
  //               <svg
  //                 xmlns='http://www.w3.org/2000/svg'
  //                 fill='none'
  //                 viewBox='0 0 24 24'
  //                 strokeWidth='1.5'
  //                 stroke='currentColor'
  //                 className='h-6 w-6'
  //                 x-tooltip='tooltip'
  //               >
  //                 <path
  //                   strokeLinecap='round'
  //                   strokeLinejoin='round'
  //                   d='M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0'
  //                 />
  //               </svg>
  //             </a>
  //             <a x-data="{ tooltip: 'Edite' }" href='#'>
  //               <svg
  //                 xmlns='http://www.w3.org/2000/svg'
  //                 fill='none'
  //                 viewBox='0 0 24 24'
  //                 strokeWidth='1.5'
  //                 stroke='currentColor'
  //                 className='h-6 w-6'
  //                 x-tooltip='tooltip'
  //               >
  //                 <path
  //                   strokeLinecap='round'
  //                   strokeLinejoin='round'
  //                   d='M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125'
  //                 />
  //               </svg>
  //             </a>
  //           </div>
  //         </td>
  //       </tr>
  //       <tr className='hover:bg-gray-50'>
  //         <th className='flex gap-3 px-6 py-4 font-normal text-gray-900'>
  //           <div className='relative h-10 w-10'>
  //             <img
  //               className='h-full w-full rounded-full object-cover object-center'
  //               src='https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  //               alt=''
  //             />
  //             <span className='absolute right-0 bottom-0 h-2 w-2 rounded-full bg-green-400 ring ring-white'></span>
  //           </div>
  //           <div className='text-sm'>
  //             <div className='font-medium text-gray-700'>Steven Jobs</div>
  //             <div className='text-gray-400'>jobs@sailboatui.com</div>
  //           </div>
  //         </th>
  //         <td className='px-6 py-4'>
  //           <span className='inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-green-600'>
  //             <span className='h-1.5 w-1.5 rounded-full bg-green-600'></span>
  //             Active
  //           </span>
  //         </td>
  //         <td className='px-6 py-4'>Product Designer</td>
  //         <td className='px-6 py-4'>
  //           <div className='flex gap-2'>
  //             <span className='inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-600'>
  //               Design
  //             </span>
  //             <span className='inline-flex items-center gap-1 rounded-full bg-indigo-50 px-2 py-1 text-xs font-semibold text-indigo-600'>
  //               Product
  //             </span>
  //             <span className='inline-flex items-center gap-1 rounded-full bg-violet-50 px-2 py-1 text-xs font-semibold text-violet-600'>
  //               Develop
  //             </span>
  //           </div>
  //         </td>
  //         <td className='px-6 py-4'>
  //           <div className='flex justify-end gap-4'>
  //             <a x-data="{ tooltip: 'Delete' }" href='#'>
  //               <svg
  //                 xmlns='http://www.w3.org/2000/svg'
  //                 fill='none'
  //                 viewBox='0 0 24 24'
  //                 strokeWidth='1.5'
  //                 stroke='currentColor'
  //                 className='h-6 w-6'
  //                 x-tooltip='tooltip'
  //               >
  //                 <path
  //                   strokeLinecap='round'
  //                   strokeLinejoin='round'
  //                   d='M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0'
  //                 />
  //               </svg>
  //             </a>
  //             <a x-data="{ tooltip: 'Edite' }" href='#'>
  //               <svg
  //                 xmlns='http://www.w3.org/2000/svg'
  //                 fill='none'
  //                 viewBox='0 0 24 24'
  //                 strokeWidth='1.5'
  //                 stroke='currentColor'
  //                 className='h-6 w-6'
  //                 x-tooltip='tooltip'
  //               >
  //                 <path
  //                   strokeLinecap='round'
  //                   strokeLinejoin='round'
  //                   d='M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125'
  //                 />
  //               </svg>
  //             </a>
  //           </div>
  //         </td>
  //       </tr>
  //     </tbody>
  //   </table>
  // </main>
}

export default UsersList
