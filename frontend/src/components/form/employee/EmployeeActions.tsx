import React, { useEffect } from 'react'
import { Space } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faTrashCan, faUserEdit } from '@fortawesome/free-solid-svg-icons'
import { useDeleteEmployeeMutation, useGetEmployeesQuery } from '../../../features/employees/EmployeesApiSlice'
import { useNavigate } from 'react-router'

interface IProps {
  id: string
}

const EmployeeActions: React.FC<IProps> = ({ id }): JSX.Element => {
  const [deleteEmployee, { isSuccess: isDelSuccess, isError: isDelError, error: delerror }] = useDeleteEmployeeMutation()

  const navigate = useNavigate()

  const onDeleteEmployeeClicked = async (id) => {
    await deleteEmployee({ id })
  }

  useEffect(() => {
    if (isDelSuccess) {
      // navigate('/home/employees-list')
      location.reload()
    }
  }, [isDelSuccess, navigate])

  return (
    <>
      <Space className='m-1 flex justify-around  '>
        <div className='mx-1'>
          <FontAwesomeIcon
            onClick={() => console.log('clicked')}
            className='bg-green-600  border-2 w-6 rounded-md p-1 ml-2  shadow-md hover:bg-green-400'
            icon={faEye}
            color='white'
          />
          <FontAwesomeIcon
            className='ml-2 border-2 rounded-md p-1 w-6  shadow-md hover:bg-green-400'
            onClick={() => console.log('clicked')}
            icon={faUserEdit}
            color='orange'
          />
          <FontAwesomeIcon
            className='ml-2 border-2 rounded-md p-1 w-6 shadow-md hover:bg-green-400'
            onClick={() => onDeleteEmployeeClicked({ id: id })}
            icon={faTrashCan}
            color='red'
          />
        </div>
      </Space>
    </>
  )
}

export default EmployeeActions
