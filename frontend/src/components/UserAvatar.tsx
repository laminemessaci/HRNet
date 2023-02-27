import React from 'react'

interface IProps {
  imageSource: string
  active: boolean
}

const UserAvatar: React.FC<IProps> = ({
  imageSource = 'https://user.oc-static.com/users/avatars/1579109717362_me1.jpg',
  active = true,
}) => {
  return (
    <div className=' flex items-center justify-center  w-12 h-12 mx-1 overflow-hidden rounded-full'>
      <img
        className='w-full  '
        // src='https://user.oc-static.com/users/avatars/1579109717362_me1.jpg'
        src={imageSource}
        alt='Avatar'
      />{' '}
      {active ? (
        <div className='absolute mb-0 p-2 w-2 ml-10  rounded-full bg-green-500 border-2 border-white'></div>
      ) : (
        <div className='absolute mb-0 p-2 w-2 ml-10  rounded-full bg-gray-500 border-2 border-white'></div>
      )}
    </div>
  )
}

export default UserAvatar
