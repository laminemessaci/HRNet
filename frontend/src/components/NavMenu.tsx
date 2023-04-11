import { Disclosure } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useSendLogoutMutation } from '../features/authApiSlice'
import useAuth from '../hooks/useAuth'
import { navigateTo } from './../utils/index'
import Dropdown from './Dropdown'

function NavMenu() {
  const navigate = useNavigate()
  const { status } = useAuth()
  let navigation = []

  const [sendLogout, { isLoading, isSuccess, isError, error }] = useSendLogoutMutation()

  useEffect(() => {
    if (isSuccess) navigate('/')
  }, [isSuccess, navigate, status])
  // if (isLoading) return <Loader color={'green'} type='bubbles' width={40} height={40} />

  if (status === 'Admin') {
    navigation = [
      // { name: 'Home', href: '/home' },
      { name: 'Add Employee', href: '/home/new-employee' },
      { name: 'Employees', href: '/home/employees-list' },
      { name: 'Users', href: '/admin/users-list' },
    ]
  }
  if (status === 'Manager') {
    navigation = [
      { name: 'Add Employee', href: '/home/new-employee' },
      { name: 'Employees', href: '/home/employees-list' },
    ]
  }
  // if (status === 'Employee') {
  //   navigation = [
  //     // { name: 'Profile', href: '/Profile' },
  //     { name: 'Edit your Profile', href: '/user/edit-profile' },
  //   ]
  // }

  return (
    <header className=' flex flex-row w-full bg-gray-200 p-4 items-center justify-center'>
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
                <div className='flex  sm:w-full items-center '>
                  <div className='hidden sm:flex sm:justify-between w-full'>
                    <div className='flex space-x-8 border-4 '>
                      <NavLink to={'/home'} key='Home'>
                        <img
                          className='w-18 h-18 h-12 p-1 hover:bg-green-400 rounded-full'
                          loading='lazy'
                          src='/logo192.ico'
                          alt='HrNet-logo'
                        />
                      </NavLink>
                      {navigation.map((item) => (
                        <NavLink
                          key={item.name}
                          to={item.href}
                          className={({ isActive }) =>
                            isActive
                              ? 'bg-green-200 text-green-900 sm:text-lg py-3 px-2 rounded-md text-center font-bold '
                              : 'text-green-900 hover:bg-green-300  sm:text-lg py-3 px-2 rounded-md text-center font-bold'
                          }
                          aria-current={item ? 'page' : undefined}
                          end
                        >
                          {item.name}
                        </NavLink>
                      ))}
                    </div>

                    {/* <button
                      onClick={sendLogout}
                      className='border px-3  rounded bg-green-700 text-green-200 hover:bg-green-200 hover:text-green-700'
                    >
                      SignOut
                    </button> */}
                    <div className='mr-0 justify-center mx-auto block  px-4 z-40'>
                      <Dropdown />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Disclosure.Panel className='sm:hidden '>
              <div className='space-y-3 px-2 pt-2 pb-3 flex flex-col'>
                {navigation.map((item: any) => (
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
                className='mx-auto block border px-3 lg:hidden  rounded bg-green-700 text-green-200 hover:bg-green-200 hover:text-green-700'
              >
                SignOut
              </button>
              <button
                onClick={() => navigateTo('/user/edit-profile', navigate)}
                className='mx-auto block border px-3 lg:hidden  rounded bg-green-700 text-green-200 hover:bg-green-200 hover:text-green-700'
              >
                Edit-Profile
              </button>
              <button
                onClick={() => navigateTo('/profile', navigate)}
                className='mx-auto block border px-3 lg:hidden  rounded bg-green-700 text-green-200 hover:bg-green-200 hover:text-green-700'
              >
                Profile
              </button>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </header>
  )
}

export default NavMenu
