/* eslint-disable @typescript-eslint/ban-ts-comment */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faUserEdit, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { Space } from 'antd'

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
    sorter: (a: { firstName: string }, b: { firstName: any }) => {
      console.log(a, b)
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
    sorter: (a: { department: string }, b: { department: any }) => a.department.localeCompare(b.department),
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
    key: 'zip',
    title: 'Zip Code',
    width: 90,
    dataIndex: 'zip',
    defaultSortOrder: 'descend',
    sortDirections: ['descend', 'ascend'],
    sorter: (a: { zip: number }, b: { zip: number }) => a.zip - b.zip,
  },
  {
    title: 'Action',
    key: 'action',
    render: () => (
      <Space className='m-1 '>
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
            onClick={() => console.log('clicked')}
            icon={faTrashCan}
            color='red'
          />
        </div>
      </Space>
    ),
  },
]
