import React from 'react'

const UserAvatar: React.FC = () => {
  return (
    <div className=' flex items-center justify-center w-10 h-10 mx-1 overflow-hidden rounded-full'>
      <img
        className='w-full  '
        // src='https://user.oc-static.com/users/avatars/1579109717362_me1.jpg'
        src='https://user.oc-static.com/users/avatars/1579109717362_me1.jpg'
        alt='Avatar'
      />{' '}
      {/* <div className=' bottom-0 left-0 w-2 h-2  rounded-full bg-green-500 border-2 border-white'></div> */}
      {/* <h5 className='text-xl font-medium leading-tight mb-2'>Lamine</h5> */}
      {/* <p className='text-gray-500'>Admin</p>  */}
    </div>
  )
}

export default UserAvatar
