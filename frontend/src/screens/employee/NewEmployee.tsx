import React from 'react'
import EmployeeForm from './../../components/form/employee/index'

const NewEmployee: React.FC = () => {
  return (
    <>
      <div className='title sm:flex flex flex-col items-center justify-center  w-full mx-auto mt-12 '>
        <img className='w-40' src={'/logo192.ico'} alt='HrNet Logo' />
        <h1 className='text-center text-7xl text-green-700'>HRNet</h1>
      </div>
      <h2 className='text-center text-2xl sm:text-5xl text-green-700 mt-12'>Create Employee</h2>
      <EmployeeForm />
    </>
  )
}

export default NewEmployee
