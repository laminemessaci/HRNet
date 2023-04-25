import React from 'react'

interface IProps {
  imageSource: string
  active: boolean
}

/**
 *  User Avatar
 * @param IProps
 * @returns
 */

const UserAvatar: React.FC<IProps> = ({
  imageSource = 'https://user.oc-static.com/users/avatars/1579109717362_me1.jpg',
  active = true,
}) => {
  return (
    <div className=' flex items-center justify-center  w-16 h-12 mx-2 overflow-hidden rounded-full object-cover'>
      <img className='w-full  ' src={imageSource} alt='Avatar' width={20} height={20} />{' '}
      {active ? (
        <div className='absolute mb-0 p-2 w-2 ml-14  rounded-full bg-green-500 border-2 border-white'></div>
      ) : (
        <div className='absolute mb-0 p-2 w-2 ml-14  rounded-full bg-gray-500 border-2 border-white'></div>
      )}
    </div>
  )
}

export default UserAvatar
