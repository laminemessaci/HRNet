import NewemployeeForm from './NewEmployeeForm'
import { useGetUsersQuery } from '../users/usersApiSlice'
import PulseLoader from 'react-spinners/PulseLoader'
import useTitle from '../../hooks/useTitle'

const NewEmployee = () => {
  useTitle('HrNetemployees: New employee')

  const { users } = useGetUsersQuery('usersList', {
    selectFromResult: ({ data }) => ({
      users: data?.ids.map((id) => data?.entities[id]),
    }),
  })

  if (!users?.length) return <PulseLoader color={'#FFF'} />

  const content = <NewemployeeForm users={users} />

  return content
}
export default NewEmployee
