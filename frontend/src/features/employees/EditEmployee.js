import { useParams } from 'react-router-dom'
import EditEmployeeForm from './EditEmployeeForm'
import { useGetEmployeesQuery } from './EmployeesApiSlice'
import { useGetUsersQuery } from '../users/usersApiSlice'
import useAuth from '../../hooks/useAuth'
import PulseLoader from 'react-spinners/PulseLoader'
import useTitle from '../../hooks/useTitle'

const EditEmployee = () => {
  useTitle('techEmployees: Edit Employee')

  const { id } = useParams()

  const { username, isManager, isAdmin } = useAuth()

  const { employee } = useGetEmployeesQuery('employeesList', {
    selectFromResult: ({ data }) => ({
      employee: data?.entities[id],
    }),
  })

  const { users } = useGetUsersQuery('usersList', {
    selectFromResult: ({ data }) => ({
      users: data?.ids.map((id) => data?.entities[id]),
    }),
  })

  if (!employee || !users?.length) return <PulseLoader color={'#FFF'} />

  if (!isManager && !isAdmin) {
    if (employee.username !== username) {
      return <p className='errmsg'>No access</p>
    }
  }

  const content = <EditEmployeeForm employee={employee} users={users} />

  return content
}
export default EditEmployee
