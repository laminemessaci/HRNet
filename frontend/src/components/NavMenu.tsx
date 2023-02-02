import { Disclosure } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import React, { useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useSendLogoutMutation } from '../features/auth/authApiSlice'

const navigation = [
  { name: 'Home', href: '/home' },
  { name: 'Create Employee', href: '/home/new-employee' },
  { name: 'View Current Employees', href: '/home/employees-list' },
]

function NavMenu() {
  const navigate = useNavigate()

  const [sendLogout, { isLoading, isSuccess, isError, error }] = useSendLogoutMutation()

  useEffect(() => {
    if (isSuccess) navigate('/')
  }, [isSuccess, navigate])

  return (
    <div className='flex flex-row w-full bg-gray-200 p-4'>
      <Disclosure as='nav' className='w-full flex flex-col justify-center items-center'>
        {({ open }) => (
          <>
            <div className='w-11/12 flex '>
              <div className='relative flex sm:w-full h-16 items-center justify-between'>
                <div className='absolute inset-y-0 left-0 flex items-center sm:hidden'>
                  {/* Mobile menu button*/}
                  <Disclosure.Button className='inline-flex items-center justify-center rounded-md p-2 text-green-700 hover:bg-green-200 hover:text-green-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-700 '>
                    <span className='sr-only'>Open main menu</span>
                    {open ? (
                      <XMarkIcon className='block h-6 w-6' aria-hidden='true' />
                    ) : (
                      <Bars3Icon className='block h-6 w-6' aria-hidden='true' />
                    )}
                  </Disclosure.Button>
                </div>
                <div className='flex  sm:w-full items-center justify-center sm:items-center sm:justify-center'>
                  <div className='hidden sm:block sm:flex sm:justify-between w-full'>
                    <div className='flex space-x-8'>
                      {navigation.map((item) => (
                        <NavLink
                          key={item.name}
                          to={item.href}
                          className={({ isActive }) =>
                            isActive
                              ? 'bg-green-200 text-green-700 sm:text-lg py-1 px-2 rounded'
                              : 'text-green-700 hover:bg-green-200 hover:green-700 sm:text-lg py-1 px-2 rounded'
                          }
                          aria-current={item ? 'page' : undefined}
                          end
                        >
                          {item.name}
                        </NavLink>
                      ))}
                    </div>
                    <button
                      onClick={sendLogout}
                      className='border px-3  rounded bg-green-700 text-green-200 hover:bg-green-200 hover:text-green-700'
                    >
                      SignOut
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <Disclosure.Panel className='sm:hidden '>
              <div className='space-y-3 px-2 pt-2 pb-3 flex flex-col'>
                {navigation.map((item) => (
                  <Disclosure.Button key={item.name}>
                    <NavLink
                      to={item.href}
                      className={({ isActive }) =>
                        isActive
                          ? 'bg-green-200 text-green-500 sm:text-xl lg:text-2xl block p-2 w-full  mx-auto'
                          : 'text-green-500 hover:bg-green-200 hover:green-700 sm:text-xl lg:text-2xl p-2  mx-auto block'
                      }
                      aria-current={item.current ? 'page' : undefined}
                      end
                    >
                      {item.name}
                    </NavLink>
                  </Disclosure.Button>
                ))}
              </div>
              <button
                onClick={sendLogout}
                className='mx-auto block border px-3  rounded bg-green-700 text-green-200 hover:bg-green-200 hover:text-green-700'
              >
                SignOut
              </button>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </div>
  )
}

export default NavMenu
