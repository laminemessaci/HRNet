import React from 'react'

import { Table } from 'antd'
import { ColumnsType } from 'antd/es/table'

interface ITableContent {
  key: string
  firstName: string
  lastName: string
  startDay: string
  department: string
  birthDay: string
  street: string
  city: string
  state: string
  zip: string
}

interface ITable {
  searchResult: ITableContent[] | null
  tableContent: ITableContent[]
  columns: ColumnsType<ITableContent>
}

const TableList: React.FC<ITable> = ({ searchResult = null, tableContent = [], columns }): JSX.Element => {
  return (
    <Table<ITableContent>
      dataSource={searchResult ? searchResult : tableContent}
      columns={columns}
      size='middle'
      rowKey={(data) => data.key}
      scroll={{ x: 'max-content', y: '500' }}
      pagination={{
        style: {
          width: '100%',
          marginBottom: '50px',
          backgroundColor: '#BBF7D0',
          borderRadius: '8px',
          padding: '10px',
          paddingLeft: '20px',
        },
        defaultPageSize: 10,
        pageSizeOptions: ['10', '25', '50', '100'],

        defaultCurrent: 1,
        showSizeChanger: true,
        position: ['topLeft'],
        showTotal: (total, range) => `Showing ${range[0]} to ${range[1]} of ${total} entries`,
      }}
    />
  )
}

export default TableList
