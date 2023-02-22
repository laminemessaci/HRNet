import React from 'react'
import { useGetEmployeesQuery } from '../../../features/employees/EmployeesApiSlice'

interface IProps {
  id: string
}

const Card: React.FC<IProps> = ({ id }): JSX.Element => {
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
  let content = null
  if (!isLoading) {
    content = (
      <div className='border border-gray-300 shadow rounded-md p-4 max-w-sm w-full mx-auto'>
        <div className='animate-pulse flex space-x-4'>
          <div className='rounded-full bg-gray-400 h-12 w-12'></div>
          <div className='flex-1 space-y-4 py-1'>
            <div className='h-4 bg-gray-400 rounded w-3/4'></div>
            <div className='space-y-2'>
              <div className='h-4 bg-gray-400 rounded'></div>
              <div className='h-4 bg-gray-400 rounded w-5/6'></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (isSuccess) {
    const { entities } = employees

    const currentEmployee = entities[id]
    content = (
      <div className='flex items-center h-screen w-full justify-center'>
        <div className='max-w-xs'>
          <div className='bg-white shadow-xl rounded-lg py-3'>
            <div className='photo-wrapper p-2'>
              <img
                className='w-32 h-32 rounded-full mx-auto'
                src='https://www.gravatar.com/avatar/2acfb745ecf9d4dccb3364752d17f65f?s=260&d=mp'
                alt='John Doe'
              />
            </div>
            <div className='p-2'>
              <h3 className='text-center text-xl text-gray-900 font-medium leading-8'>
                {currentEmployee.firstName + ' ' + currentEmployee.lastName}
              </h3>
              <div className='text-center text-gray-400 text-xs font-semibold'>
                <p>{currentEmployee?.department}</p>
              </div>
              <table className='text-xs my-3'>
                <tbody>
                  <tr className='bg-gray-100 rounded-sm '>
                    <td className='px-2 py-2 text-gray-400 font-semibold '>Address: </td>
                    <td className='px-2 py-3'>{currentEmployee.street}</td>
                  </tr>
                  <tr className='bg-gray-100 rounded-sm '>
                    <td></td>
                    <td className='px-4 py-0 flex justify-center'>{currentEmployee.zipCode + ' ' + currentEmployee.city}</td>
                  </tr>

                  <tr>
                    <td className='px-2 py-2 text-gray-500 font-semibold'>Phone: </td>
                    <td className='px-2 py-2'>+977 9955221114</td>
                  </tr>
                  <tr className='bg-gray-100 rounded-sm '>
                    <td className='px-2 py-2 text-gray-500 font-semibold'>Email: </td>
                    <td className='px-2 py-2'>john@exmaple.com</td>
                  </tr>
                </tbody>
              </table>

              <div className='text-center my-3'>
                <a className='text-xs text-emerald-800 italic hover:underline hover:text-lime-600 font-medium' href='#'>
                  update Profile
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return content
}

export default Card
