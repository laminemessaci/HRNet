/* eslint-disable @typescript-eslint/ban-ts-comment */
import UserAvatar from '../components/UserAvatar'
import EmployeeActions from '../components/form/employee/EmployeeActions'
import { IColumn } from './EmployeesColumn'

// @ts-ignore
export const columns: IColumn = [
  {
    key: 'avatar',
    title: 'Avatar',
    dataIndex: 'avatar',
    render: (avatar: string) => <UserAvatar imageSource={avatar} />,
  },
  {
    key: 'active',
    title: 'Active',
    dataIndex: 'active',
    render: (active: boolean) => (
      <span className='inline-flex items-center gap-1 rounded-full bg-gray-100 px-2 py-1 text-xs font-semibold text-green-600'>
        <span className={active ? 'h-1.5 w-1.5 rounded-full  bg-green-600' : 'h-1.5 w-1.5 rounded-full  bg-gray-600'}></span>
        Active
      </span>
    ),
  },
  {
    key: 'email',
    title: 'Email',
    dataIndex: 'email',
    defaultSortOrder: 'descend',
    sortDirections: ['descend', 'ascend'],
    sorter: (a: { email: string }, b: { email: string }) => a.email.localeCompare(b.email),
  },
  {
    key: 'firstName',
    title: 'FirstName',
    dataIndex: 'firstName',
    defaultSortOrder: 'descend',
    sortDirections: ['descend', 'ascend'],
    sorter: (a: { firstName: string }, b: { firstName: any }) => {
      return a.firstName.localeCompare(b.firstName)
    },
  },
  {
    key: 'lastName',
    title: 'LastName',
    dataIndex: 'lastName',
    defaultSortOrder: 'descend',
    sortDirections: ['descend', 'ascend'],
    sorter: (a: { lastName: string }, b: { lastName: any }) => a.lastName.localeCompare(b.lastName),
  },
  {
    key: 'roles',
    title: 'Roles',
    dataIndex: 'roles',
    defaultSortOrder: 'descend',
    sortDirections: ['descend', 'ascend'],
    sorter: (a: { roles: string }, b: { roles: string }) => a.roles.localeCompare(b.roles),
  },
  {
    key: 'department',
    title: 'Department',
    dataIndex: 'department',
    defaultSortOrder: 'descend',
    sortDirections: ['descend', 'ascend'],
    sorter: (a: { department: string }, b: { department: any }) => a.department.localeCompare(b.department),
  },
  {
    key: 'createdAt',
    title: 'Created at',
    dataIndex: 'createdAt',
    defaultSortOrder: 'descend',
    sortDirections: ['descend', 'ascend'],
    sorter: (a: { createdAt: string | number | Date }, b: { createdAt: string | number | Date }) =>
      // @ts-expect-error
      new Date(b.createdAt) - new Date(a.createdAt),
    render: (date: any) => date,
  },

  // {
  //   title: 'Action',
  //   key: 'action',
  //   dataIndex: 'key',
  //   render: (id: string) => <EmployeeActions id={id} />,
  // },
]
