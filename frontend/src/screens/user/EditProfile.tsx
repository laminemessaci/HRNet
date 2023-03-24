/* eslint-disable react/no-unescaped-entities */
import React, { useState, useEffect } from 'react'
import UpdateUserForm from '../../components/form/user/UpdateUserForm'
import { useParams } from 'react-router-dom'

/**
 * * Profile Edit Page
 * @returns {JSX.Element}
 */
const EditProfile: React.FC = (): JSX.Element => {
  const { userId } = useParams()
  console.log(userId + ' from EditProfile.tsx')
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
