import { useGetEmployeesQuery } from './EmployeesApiSlice'
import Note from './Employee'
import useAuth from '../../hooks/useAuth'
import useTitle from '../../hooks/useTitle'
import PulseLoader from 'react-spinners/PulseLoader'

const EmployeesList = () => {
  useTitle('hrNetEmployees: Employees List')

  const { username, isManager, isAdmin } = useAuth()

  const {
    data: employees,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetEmployeesQuery('employeesList', {
    pollingInterval: 15000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  })

  let content

  if (isLoading) content = <PulseLoader color={'#FFF'} />

  if (isError) {
    content = <p className='errmsg'>{error?.data?.message}</p>
  }

  if (isSuccess) {
    const { ids, entities } = employees

    let filteredIds
    if (isManager || isAdmin) {
      filteredIds = [...ids]
    } else {
      filteredIds = ids.filter((noteId) => entities[noteId].username === username)
    }

    const tableContent = ids?.length && filteredIds.map((noteId) => <Note key={noteId} noteId={noteId} />)

    content = (
      <table className='table table--employees'>
        <thead className='table__thead'>
          <tr>
            <th scope='col' className='table__th note__status'>
              Username
            </th>
            <th scope='col' className='table__th note__created'>
              Created
            </th>
            <th scope='col' className='table__th note__updated'>
              Updated
            </th>
            <th scope='col' className='table__th note__title'>
              Title
            </th>
            <th scope='col' className='table__th note__username'>
              Owner
            </th>
            <th scope='col' className='table__th note__edit'>
              Edit
            </th>
          </tr>
        </thead>
        <tbody>{tableContent}</tbody>
      </table>
    )
  }

  return content
}
export default EmployeesList
