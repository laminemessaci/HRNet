import { useGetEmployeesQuery } from './EmployeesApiSlice'
import Employee from './Employee'
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
      filteredIds = ids.filter((employeeId) => entities[employeeId].username === username)
    }

    const tableContent = ids?.length && filteredIds.map((employeeId) => <Employee key={employeeId} employeeId={employeeId} />)

    content = (
      <table className='table table--employees'>
        <thead className='table__thead'>
          <tr>
            <th scope='col' className='table__th employee__status'>
              Username
            </th>
            <th scope='col' className='table__th employee__created'>
              Created
            </th>
            <th scope='col' className='table__th employee__updated'>
              Updated
            </th>
            <th scope='col' className='table__th employee__title'>
              Title
            </th>
            <th scope='col' className='table__th employee__username'>
              Owner
            </th>
            <th scope='col' className='table__th employee__edit'>
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
