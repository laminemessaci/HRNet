import React, { memo } from 'react'
import { useGetEmployeesQuery } from '../../../features/EmployeesApiSlice'

interface IProps {
  id: string
}

/**
 ** Employee Card
 * @param id  Employee ID
 * @returns 
 */
const EmployeeCard: React.FC<IProps> = ({ id }): JSX.Element => {
  const { employee } = useGetEmployeesQuery('employeesList', {
    selectFromResult: ({ data }) => ({
      employee: data?.entities[id],
    }),
  })

  return (
    <div className='flex items-center h-screen w-full justify-center  mx-auto'>
      <div className='md:w-2/3 '>
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
              {employee.firstName + ' ' + employee.lastName}
            </h3>
            <div className='text-center text-gray-400 text-xs font-semibold'>
              <p>{employee?.department}</p>
            </div>
            <table className='text-xs my-3'>
              <tbody>
                <tr className='bg-gray-100 rounded-sm'>
                  <td className='px-2 py-2 text-gray-400 font-semibold '>Address: </td>
                  <td className='px-2 py-3'>{employee.street}</td>
                </tr>
                <tr className='bg-gray-100 rounded-sm '>
                  <td></td>
                  <td className='px-4 py-0 flex items-center justify-start'>{employee.zipCode + ' ' + employee.city}</td>
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

const memoizedEmployee = memo(EmployeeCard)

export default memoizedEmployee
