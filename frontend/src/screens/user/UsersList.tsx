import React from 'react'

const UsersList: React.FC = (): JSX.Element => {
  return (
    <main className='container h-screen flex justify-center items-center max-w-xl px-4 mx-auto sm:px-8'>
      <div className='py-8'>
        <div className='px-4 py-4 -mx-4 overflow-x-auto sm:-mx-8 sm:px-8'>
          <div className='inline-block min-w-full overflow-hidden rounded-lg shadow'>
            <table className='min-w-full leading-normal'>
              <thead>
                <tr>
                  <th
                    scope='col'
                    className='px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200'
                  >
                    User
                  </th>
                  <th
                    scope='col'
                    className='px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200'
                  >
                    Role
                  </th>
                  <th
                    scope='col'
                    className='px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200'
                  >
                    Created at
                  </th>
                  <th
                    scope='col'
                    className='px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200'
                  >
                    status
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className='px-5 py-5 text-sm bg-white border-b border-gray-200'>
                    <div className='flex items-center'>
                      <div className='flex-shrink-0'>
                        <a href='#' className='relative block'>
                          <img
                            alt='profil'
                            src='https://user.oc-static.com/users/avatars/1579109717362_me1.jpg'
                            className='mx-auto object-cover rounded-full h-10 w-10 '
                          />
                        </a>
                      </div>
                      <div className='ml-3'>
                        <p className='text-gray-900 whitespace-no-wrap'>Jean marc</p>
                      </div>
                    </div>
                  </td>
                  <td className='px-5 py-5 text-sm bg-white border-b border-gray-200'>
                    <p className='text-gray-900 whitespace-no-wrap'>Admin</p>
                  </td>
                  <td className='px-5 py-5 text-sm bg-white border-b border-gray-200'>
                    <p className='text-gray-900 whitespace-no-wrap'>12/09/2020</p>
                  </td>
                  <td className='px-5 py-5 text-sm bg-white border-b border-gray-200'>
                    <span className='relative inline-block px-3 py-1 font-semibold leading-tight text-green-900'>
                      <span aria-hidden='true' className='absolute inset-0 bg-green-200 rounded-full opacity-50'></span>
                      <span className='relative'>active</span>
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className='px-5 py-5 text-sm bg-white border-b border-gray-200'>
                    <div className='flex items-center'>
                      <div className='flex-shrink-0'>
                        <a href='#' className='relative block'>
                          <img
                            alt='profil'
                            src='https://user.oc-static.com/users/avatars/1579109717362_me1.jpg'
                            className='mx-auto object-cover rounded-full h-10 w-10 '
                          />
                        </a>
                      </div>
                      <div className='ml-3'>
                        <p className='text-gray-900 whitespace-no-wrap'>Marcus coco</p>
                      </div>
                    </div>
                  </td>
                  <td className='px-5 py-5 text-sm bg-white border-b border-gray-200'>
                    <p className='text-gray-900 whitespace-no-wrap'>Designer</p>
                  </td>
                  <td className='px-5 py-5 text-sm bg-white border-b border-gray-200'>
                    <p className='text-gray-900 whitespace-no-wrap'>01/10/2012</p>
                  </td>
                  <td className='px-5 py-5 text-sm bg-white border-b border-gray-200'>
                    <span className='relative inline-block px-3 py-1 font-semibold leading-tight text-green-900'>
                      <span aria-hidden='true' className='absolute inset-0 bg-green-200 rounded-full opacity-50'></span>
                      <span className='relative'>active</span>
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className='px-5 py-5 text-sm bg-white border-b border-gray-200'>
                    <div className='flex items-center'>
                      <div className='flex-shrink-0'>
                        <a href='#' className='relative block'>
                          <img
                            alt='profil'
                            src='https://user.oc-static.com/users/avatars/1579109717362_me1.jpg'
                            className='mx-auto object-cover rounded-full h-10 w-10 '
                          />
                        </a>
                      </div>
                      <div className='ml-3'>
                        <p className='text-gray-900 whitespace-no-wrap'>Ecric marc</p>
                      </div>
                    </div>
                  </td>
                  <td className='px-5 py-5 text-sm bg-white border-b border-gray-200'>
                    <p className='text-gray-900 whitespace-no-wrap'>Developer</p>
                  </td>
                  <td className='px-5 py-5 text-sm bg-white border-b border-gray-200'>
                    <p className='text-gray-900 whitespace-no-wrap'>02/10/2018</p>
                  </td>
                  <td className='px-5 py-5 text-sm bg-white border-b border-gray-200'>
                    <span className='relative inline-block px-3 py-1 font-semibold leading-tight text-green-900'>
                      <span aria-hidden='true' className='absolute inset-0 bg-green-200 rounded-full opacity-50'></span>
                      <span className='relative'>active</span>
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className='px-5 py-5 text-sm bg-white border-b border-gray-200'>
                    <div className='flex items-center'>
                      <div className='flex-shrink-0'>
                        <a href='#' className='relative block'>
                          <img
                            alt='profil'
                            src='https://user.oc-static.com/users/avatars/1579109717362_me1.jpg'
                            className='mx-auto object-cover rounded-full h-10 w-10 '
                          />
                        </a>
                      </div>
                      <div className='ml-3'>
                        <p className='text-gray-900 whitespace-no-wrap'>Julien Huger</p>
                      </div>
                    </div>
                  </td>
                  <td className='px-5 py-5 text-sm bg-white border-b border-gray-200'>
                    <p className='text-gray-900 whitespace-no-wrap'>User</p>
                  </td>
                  <td className='px-5 py-5 text-sm bg-white border-b border-gray-200'>
                    <p className='text-gray-900 whitespace-no-wrap'>23/09/2010</p>
                  </td>
                  <td className='px-5 py-5 text-sm bg-white border-b border-gray-200'>
                    <span className='relative inline-block px-3 py-1 font-semibold leading-tight text-green-900'>
                      <span aria-hidden='true' className='absolute inset-0 bg-green-200 rounded-full opacity-50'></span>
                      <span className='relative'>active</span>
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  )
}

export default UsersList
