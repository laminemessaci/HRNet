import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'
import { useGetEmployeesQuery } from './EmployeesApiSlice'
import { memo } from 'react'

const Employee = ({ employeeId }) => {
  const { employee } = useGetEmployeesQuery('employeesList', {
    selectFromResult: ({ data }) => ({
      employee: data?.entities[employeeId],
    }),
  })

  const navigate = useNavigate()

  if (employee) {
    const created = new Date(employee.createdAt).toLocaleString('en-US', { day: 'numeric', month: 'long' })

    const updated = new Date(employee.updatedAt).toLocaleString('en-US', { day: 'numeric', month: 'long' })

    const handleEdit = () => navigate(`/dash/employees/${employeeId}`)

    return (
      <tr className='table__row'>
        <td className='table__cell employee__status'>
          {employee.completed ? (
            <span className='employee__status--completed'>Completed</span>
          ) : (
            <span className='employee__status--open'>Open</span>
          )}
        </td>
        <td className='table__cell employee__created'>{created}</td>
        <td className='table__cell employee__updated'>{updated}</td>
        <td className='table__cell employee__title'>{employee.title}</td>
        <td className='table__cell employee__username'>{employee.username}</td>

        <td className='table__cell'>
          <button className='icon-button table__button' onClick={handleEdit}>
            <FontAwesomeIcon icon={faPenToSquare} />
          </button>
        </td>
      </tr>
    )
  } else return null
}

const memoizedEmployee = memo(Employee)

export default memoizedEmployee
