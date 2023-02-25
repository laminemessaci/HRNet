import React from 'react'

interface IProps {
  imageSource: string
}

const UserAvatar: React.FC<IProps> = ({
  imageSource = 'https://user.oc-static.com/users/avatars/1579109717362_me1.jpg',
}) => {
  return (
    <div className=' flex items-center justify-center  w-12 h-12 mx-1 overflow-hidden rounded-full'>
      <img
        className='w-full  '
        // src='https://user.oc-static.com/users/avatars/1579109717362_me1.jpg'
        src={imageSource}
        alt='Avatar'
      />{' '}
      <div className='absolute mb-0 p-2 w-2 ml-10  rounded-full bg-green-500 border-2 border-white'></div>
      {/* <h5 className='text-xl font-medium leading-tight mb-2'>Lamine</h5> */}
      {/* <span className=' absolute mt-10  text-red-500 text-xs'>Admin</span> */}
    </div>
  )
}

export default UserAvatar
