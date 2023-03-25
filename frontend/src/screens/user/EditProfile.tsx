/* eslint-disable react/no-unescaped-entities */
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import UpdateUserForm from '../../components/form/user/UpdateUserForm'

/**
 * * Profile Edit Page
 * @returns {JSX.Element}
 */
const EditProfile: React.FC = (): JSX.Element => {
  const { userId } = useParams()
 
  useEffect(() => {
    console.log(userId)
  }, [userId])

  if (userId)
    return (
      <main className='my-12'>
        <UpdateUserForm id={userId} setIsOpen={null} fromUser={true} />
      </main>
    )
}

export default EditProfile
