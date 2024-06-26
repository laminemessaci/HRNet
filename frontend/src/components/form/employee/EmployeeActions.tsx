import { faEye, faTrashCan, faUserEdit } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Space } from 'antd'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { useDeleteEmployeeMutation } from '../../../features/EmployeesApiSlice'
import Drawer from '../../Drawer'
import Card from './EmployeeCard'
import UpdateForm from './UpdateEmployeeForm'

interface IProps {
  id: string
}
/**
 ** CRUD Employee
 * @param id employee ID
 * @returns {JSXElement}
 */

const EmployeeActions: React.FC<IProps> = ({ id }): JSX.Element => {
  const [deleteEmployee, { isSuccess: isDelSuccess, isError: isDelError, error: delerror }] = useDeleteEmployeeMutation()
  const [isOpen, setIsOpen] = React.useState(false)
  const [action, setAction] = React.useState(null)

  // function dateFormat(seconds) {
  //   return new Date(seconds * 1000).toLocaleDateString('fr')
  // }

  const navigate = useNavigate()

  const onDeleteEmployeeClicked = async (id) => {
    // const deleteEmployee: (isOk: boolean) => boolean = confirm('Are you sure you want to delete this employee?')

    await deleteEmployee({ id })

    // return <ConfirmAction messageText={'toto'} title={'toto'} isValidate={isValidate} setIsValidate={setIsValidate} />
  }

  const handlEyeClicked = (id) => {
    setAction('details')
    setIsOpen(true)
  }

  useEffect(() => {
    if (isDelSuccess) {
      // navigate('/home/employees-list')
      location.reload()
    }
  }, [isDelSuccess, navigate])

  function handlUpdate(id: string): void {
    setAction('update')
    setIsOpen(true)
  }

  return (
    <>
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
            onClick={() => onDeleteEmployeeClicked({ id: id })}
            icon={faTrashCan}
            color='red'
          />
        </div>
      </Space>

      <Drawer isOpen={isOpen} setIsOpen={setIsOpen}>
        {action == 'details' ? <Card id={id} /> : <UpdateForm id={id} setIsOpen={setIsOpen} />}
      </Drawer>
    </>
  )
}

export default EmployeeActions
