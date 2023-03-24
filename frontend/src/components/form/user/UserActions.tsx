/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable react/jsx-no-comment-textnodes */
import React, { useEffect } from 'react'
import { Space } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faTrashCan, faUserEdit } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router'
import Drawer from '../../Drawer'
import UserCard from './UserCard'
import { useDeleteUserMutation } from '../../../features/users/usersApiSlice'
import Message from '../../Message'
import UpdateUserForm from './UpdateUserForm'
import { useToast } from '../../../notifications/ToastProvider'

interface IProps {
  id: string
}

const UserActions: React.FC<IProps> = ({ id }): JSX.Element => {
  const [deleteUser, { isSuccess: isDelSuccess, isError: isDelError, error: delerror }] = useDeleteUserMutation()
  const [isOpen, setIsOpen] = React.useState(false)
  const [action, setAction] = React.useState(null)
  const toast = useToast()

  // function dateFormat(seconds) {
  //   return new Date(seconds * 1000).toLocaleDateString('fr')
  // }

  const navigate = useNavigate()

  const onDeleteUserClicked = async (id) => {
    await deleteUser({ id })
    if (isDelError) {
      //   toast?.error(delerror?.data['message'], 5000)
      // @ts-ignore
      toast?.pushError(`This ${delerror?.data?.message}`)
    }
  }

  const handlEyeClicked = (id) => {
    setAction('details')
    setIsOpen(true)
  }

  useEffect(() => {
    if (isDelSuccess) {
      toast?.pushSuccess('User deleted successfully')
      location.reload()
    }
  }, [navigate, isDelSuccess, id])

  function handlUpdate(id: string): void {
    setAction('update')
    setIsOpen(true)
  }

  return (
    <>
      {/* 
// @ts-ignore */}
      {/* {isDelError && <Message>{delerror?.data['message']}</Message>} */}
      <Space className='m-1 flex justify-around  '>
        <div className='mx-1'>
          <FontAwesomeIcon
            onClick={() => handlEyeClicked(id)}
            className='bg-green-600  border-2 w-6 rounded-md p-1 ml-2  shadow-md hover:bg-green-400'
            icon={faEye}
            color='white'
          />
          <FontAwesomeIcon
            className='ml-2 border-2 rounded-md p-1 w-6  shadow-md hover:bg-green-400'
            onClick={() => handlUpdate(id)}
            icon={faUserEdit}
            color='orange'
          />
          <FontAwesomeIcon
            className='ml-2 border-2 rounded-md p-1 w-6 shadow-md hover:bg-green-400'
            onClick={() => onDeleteUserClicked({ id: id })}
            icon={faTrashCan}
            color='red'
          />
        </div>
      </Space>

      <Drawer isOpen={isOpen} setIsOpen={setIsOpen}>
        {action == 'details' ? <UserCard id={id} /> : <UpdateUserForm id={id} setIsOpen={setIsOpen} />}
      </Drawer>
    </>
  )
}

export default UserActions
