import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import React, { Fragment, useEffect } from 'react'

import { useNavigate } from 'react-router'
import { useSendLogoutMutation } from '../features/authApiSlice'
import { useGetUsersQuery } from '../features/usersApiSlice.js'
import useAuth from '../hooks/useAuth'
import { navigateTo } from '../utils/index'
import UserAvatar from './UserAvatar'

const Dropdown: React.FC = (): JSX.Element => {
  const navigate = useNavigate()
  const { email, roles } = useAuth()

  const { users } = useGetUsersQuery('usersList', {
    selectFromResult: ({ data }) => ({
      users: data?.ids.map((id) => data?.entities[id]),
    }),
  })
  const currentUser = users?.find((user) => user.email === email) || null
  const userId = currentUser?.id

  const [sendLogout, { isSuccess }] = useSendLogoutMutation()

  useEffect(() => {
    if (isSuccess) navigate('/')
  }, [isSuccess, navigate, currentUser])

  return (
    <div className='w-auto text-right justify-center   rounded-full '>
      <Menu as='div' className='relative inline-block text-left'>
        <div>
          <Menu.Button className='inline-flex w-full justify-center rounded-full items-center  bg-lime-900 bg-opacity-20 px-2 py-2 text-sm font-medium text-white hover:bg-opacity-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75'>
            <UserAvatar
              imageSource={users?.length > 0 ? users.find((user) => user.email === email).avatar : null}
              active={users?.length > 0 && users.find((user) => user.email === email).active}
            />{' '}
            Options
            <ChevronDownIcon className='ml-2 -mr-1 h-5 w-5 text-violet-200 hover:text-violet-100' aria-hidden='true' />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter='transition ease-out duration-100'
          enterFrom='transform opacity-0 scale-95'
          enterTo='transform opacity-100 scale-100'
          leave='transition ease-in duration-75'
          leaveFrom='transform opacity-100 scale-100'
          leaveTo='transform opacity-0 scale-95'
        >
          <Menu.Items className='absolute right-0 mt-2 w-32 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
            <div className='px-1 py-1 '>
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={() => navigateTo(`/edit-profile/${userId}`, navigate)}
                    className={`${
                      active ? 'bg-green-200 text-white' : 'text-lime-700'
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    {active ? (
                      <EditActiveIcon className='mr-2 h-5 w-5' aria-hidden='true' />
                    ) : (
                      <EditInactiveIcon className='mr-2 h-5 w-5  color:green-200' aria-hidden='true' />
                    )}
                    Edit
                  </button>
                )}
              </Menu.Item>
              {/* <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={() => navigateTo('/profile', navigate)}
                    className={`${
                      active ? 'bg-green-200 text-white' : 'text-lime-700'
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    {active ? (
                      <DuplicateActiveIcon className='mr-2 h-5 w-5' aria-hidden='true' />
                    ) : (
                      <DuplicateInactiveIcon className='mr-2 h-5 w-5' aria-hidden='true' />
                    )}
                    Details
                  </button>
                )}
              </Menu.Item> */}
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={sendLogout}
                    className={`${
                      active ? 'bg-green-200 text-white' : 'text-lime-700'
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    {active ? (
                      <LogoutActiveIcon className='mr-2 h-5 w-5' aria-hidden='true' />
                    ) : (
                      <LogOutInactiveIcon className='mr-2 h-5 w-5' aria-hidden='true' />
                    )}
                    SignOut
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  )
}

function EditInactiveIcon(props) {
  return (
    <svg {...props} viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path d='M4 13V16H7L16 7L13 4L4 13Z' fill='#4d7c0f' stroke='#15803d' strokeWidth='2' />
    </svg>
  )
}

function EditActiveIcon(props) {
  return (
    <svg {...props} viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path d='M4 13V16H7L16 7L13 4L4 13Z' stroke='#15803d' strokeWidth='2' />
    </svg>
  )
}
function LogoutActiveIcon(props) {
  return (
    <svg {...props} fill='none' height='20' viewBox='0 0 24 24' width='20' xmlns='http://www.w3.org/2000/svg'>
      <path clipRule='evenodd' d='M2 13H14V11H2V13Z' fillRule='evenodd' stroke='#15803d' />
      <path
        clipRule='evenodd'
        d='M4.79282 7.79289L1.29282 11.2929C0.902294 11.6834 0.902294 12.3166 1.29282 12.7071L4.79282 16.2071L6.20703 14.7929L3.41414 12L6.20703 9.20711L4.79282 7.79289Z'
        fill='#4d7c0f'
        fillRule='evenodd'
        stroke='#15803d'
      />
      <path
        clipRule='evenodd'
        d='M14.5954 5.5C12.1159 5.5 9.95745 6.93099 8.89246 9.03855L7.10742 8.13653C8.49483 5.39092 11.3226 3.5 14.5954 3.5C19.2491 3.5 22.9999 7.31769 22.9999 12C22.9999 16.6823 19.2491 20.5 14.5954 20.5C11.3226 20.5 8.49483 18.6091 7.10742 15.8635L8.89246 14.9615C9.95745 17.069 12.1159 18.5 14.5954 18.5C18.1205 18.5 20.9999 15.602 20.9999 12C20.9999 8.39803 18.1205 5.5 14.5954 5.5Z'
        fillRule='evenodd'
        stroke='#15803d'
      />
    </svg>
  )
}
function LogOutInactiveIcon(props) {
  return (
    <svg {...props} fill='none' height='20' viewBox='0 0 24 24' width='20' xmlns='http://www.w3.org/2000/svg'>
      <path clipRule='evenodd' d='M2 13H14V11H2V13Z' fill='#4d7c0f' fillRule='evenodd' stroke='#15803d' />
      <path
        clipRule='evenodd'
        d='M4.79282 7.79289L1.29282 11.2929C0.902294 11.6834 0.902294 12.3166 1.29282 12.7071L4.79282 16.2071L6.20703 14.7929L3.41414 12L6.20703 9.20711L4.79282 7.79289Z'
        stroke='#15803d'
        fill='#4d7c0f'
        fillRule='evenodd'
      />
      <path
        clipRule='evenodd'
        d='M14.5954 5.5C12.1159 5.5 9.95745 6.93099 8.89246 9.03855L7.10742 8.13653C8.49483 5.39092 11.3226 3.5 14.5954 3.5C19.2491 3.5 22.9999 7.31769 22.9999 12C22.9999 16.6823 19.2491 20.5 14.5954 20.5C11.3226 20.5 8.49483 18.6091 7.10742 15.8635L8.89246 14.9615C9.95745 17.069 12.1159 18.5 14.5954 18.5C18.1205 18.5 20.9999 15.602 20.9999 12C20.9999 8.39803 18.1205 5.5 14.5954 5.5Z'
        stroke='#15803d'
        fill='#4d7c0f'
        fillRule='evenodd'
      />
    </svg>
  )
}

export default Dropdown
