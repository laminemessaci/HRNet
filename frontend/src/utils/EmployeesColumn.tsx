/* eslint-disable @typescript-eslint/ban-ts-comment */
import EmployeeActions from '../components/form/employee/EmployeeActions'

export interface IColumn {
  key: string
  title: string
  dataIndex: string
  defaultSortOrder: 'descend' | 'ascend'
  sortDirections: ('descend' | 'ascend')[]
  sorter: (a: { [key: string]: string | number | Date }, b: { [key: string]: string | number | Date }) => number 
  render?: (date: any) => any
}

// @ts-ignore

export const columns: IColumn = [
  {
    key: 'firstName',
    title: 'FirstName',
    dataIndex: 'firstName',
    defaultSortOrder: 'descend',
    sortDirections: ['descend', 'ascend'],
    sorter: (a: { firstName: string }, b: { firstName: string }) => {
      return a.firstName.localeCompare(b.firstName)
    },
  },
  {
    key: 'lastName',
    title: 'LastName',
    dataIndex: 'lastName',
    defaultSortOrder: 'descend',
    sortDirections: ['descend', 'ascend'],
    sorter: (a: { lastName: string }, b: { lastName: string }) => a.lastName.localeCompare(b.lastName),
  },
  {
    key: 'starDay',
    title: 'Start Date',
    dataIndex: 'startDay',
    defaultSortOrder: 'descend',
    sortDirections: ['descend', 'ascend'],
    sorter: (a: { startDay: string | number | Date }, b: { startDay: string | number | Date }) =>
      // @ts-expect-error
      new Date(b.startDay) - new Date(a.startDay),
    render: (date: any) => date,
  },
  {
    key: 'department',
    title: 'Department',
    dataIndex: 'department',
    defaultSortOrder: 'descend',
    sortDirections: ['descend', 'ascend'],
    sorter: (a: { department: string }, b: { department: string }) => a.department.localeCompare(b.department),
  },
  {
    key: 'birthDay',
    title: 'Birth Day',
    dataIndex: 'birthDay',
    defaultSortOrder: 'descend',
    sortDirections: ['descend', 'ascend'],
    sorter: (a: { birthDay: string | number | Date }, b: { birthDay: string | number | Date }) =>
      // @ts-expect-error
      new Date(a.birthDay) - new Date(b.birthDay),
    render: (date: any) => date,
  },
  {
    key: 'street',
    title: 'Street',
    dataIndex: 'street',
    defaultSortOrder: 'descend',
    sortDirections: ['descend', 'ascend'],
    sorter: (a: { street: string }, b: { street: any }) => a.street.localeCompare(b.street),
  },
  {
    key: 'city',
    title: 'City',
    dataIndex: 'city',
    defaultSortOrder: 'descend',
    sortDirections: ['descend', 'ascend'],
    sorter: (a: { city: string }, b: { city: any }) => a.city.localeCompare(b.city),
  },
  {
    key: 'state',
    title: 'State',
    dataIndex: 'state',
    defaultSortOrder: 'descend',
    sortDirections: ['descend', 'ascend'],
    sorter: (a: { state: string }, b: { state: any }) => a.state.localeCompare(b.state),
  },
  {
    key: 'zipCode',
    title: 'Zip Code',
    width: 90,
    dataIndex: 'zipCode',
    defaultSortOrder: 'descend',
    sortDirections: ['descend', 'ascend'],
    sorter: (a: { zipCode: number }, b: { zipCode: number }) => a.zipCode - b.zipCode,
  },
  {
    title: 'Action',
    key: 'action',
    dataIndex: 'key',
    // @ts-ignore
    render: (id: string) => <EmployeeActions id={id} />,
  },
]
