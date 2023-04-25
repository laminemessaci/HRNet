import React, { memo } from 'react'
import { useGetUsersQuery } from '../../../features/usersApiSlice'

interface IProps {
  id: string
}

/**
 * * User Card Component
 * @param id User ID 
 * @returns 
 */
const UserCard: React.FC<IProps> = ({ id }): JSX.Element => {
  const { user } = useGetUsersQuery('usersList', {
    selectFromResult: ({ data }) => ({
      user: data?.entities[id],
    }),
  })

  return (
    <div className='flex items-center h-screen w-full justify-center  mx-auto'>
      <div className='md:w-2/3 '>
        <div className='bg-white shadow-xl rounded-lg py-3'>
          <div className='photo-wrapper p-2'>
            <img className='w-32 h-32 rounded-full mx-auto' src={user?.avatar} alt={user.lastName + user.firstName} />
          </div>
          <div className='p-2'>
            <h3 className='text-center text-xl text-gray-900 font-medium leading-8'>
              {user.firstName + ' ' + user.lastName}
            </h3>
            <div className='text-center text-gray-400 text-xs font-semibold'>
              <p>{user?.department}</p>
            </div>

            <table className='text-xs my-3'>
              <tbody>
                <tr className='bg-gray-100 rounded-sm'>
                  <td className='px-2 py-2 text-gray-400 font-semibold '>Email: </td>
                  <td className='px-2 py-3'>{user.email}</td>
                </tr>
                <tr className='bg-gray-100 rounded-sm '>
                  <td className='px-2 py-2 text-gray-400 font-semibold '>Status:</td>
                  <td className='px-2 py-3 flex items-center justify-start'>{user.roles}</td>
                </tr>

                <tr>
                  <td className='px-2 py-2 text-gray-500 font-semibold'>Phone: </td>
                  <td className='px-2 py-2'>{user.phone} </td>
                </tr>
                <tr className='bg-gray-100 rounded-sm '>
                  <td className='px-2 py-2 text-gray-500 font-semibold'>Email: </td>
                  <td className='px-2 py-2'>{user?.email}</td>
                </tr>
              </tbody>
            </table>

            <div className='text-center my-3'>
              <a className='text-xs text-emerald-800 italic hover:underline hover:text-lime-600 font-medium' href='#'>
                ** hrNet **
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
const memoizedUser = memo(UserCard)
export default memoizedUser
