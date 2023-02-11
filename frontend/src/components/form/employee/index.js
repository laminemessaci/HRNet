import React from 'react'

const EmployeeForm = () => {
  return (
    <>
      <form onSubmit={() => console.log('handlSubmit')} className='w-4/5 sm:w-2/5 mx-auto mt-8'>
        <div>
          <label htmlFor='firstname' className='block text-sm font-medium text-gray-700'>
            Firstname
          </label>

          <input
            type='text'
            name='firstname'
            id='firstname'
            className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm'
            placeholder='Firstname'
          />
        </div>
        <div className='mt-8'>
          <label htmlFor='lastname' className='block text-sm font-medium text-gray-700'>
            Lastname
          </label>
          <input
            type='text'
            name='lastname'
            id='lastname'
            className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm'
            placeholder='Lastname'
          />
        </div>
        <div className='mt-8'>
          <label htmlFor='birthDate' className='block text-sm font-medium text-gray-700'>
            Date of Birth
          </label>
        </div>
        <div className='mt-8 '>
          <label htmlFor='startdate' className='block text-sm font-medium text-gray-700'>
            Start Date
          </label>
        </div>
        <div className='adress border mt-8 bg-green-200 mb-8'>
          <h1 className='text-green-600 text-center mt-8'>Address</h1>
          <div className='mt-8 w-11/12 sm:w-1/2 mx-auto'>
            <label htmlFor='street' className='block text-sm font-medium text-gray-700'>
              Street
            </label>

            <input
              type='text'
              name='street'
              id='street'
              className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm'
              placeholder='street'
            />
          </div>
          <div className='mt-8 w-11/12 sm:w-1/2 mx-auto mb-8'>
            <label htmlFor='city' className='block text-sm font-medium text-gray-700'>
              City
            </label>

            <input
              type='text'
              name='city'
              id='city'
              className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm'
              placeholder='city'
            />
          </div>

          <div className='mt-8 w-11/12 sm:w-1/2 mx-auto mb-8'>
            <label htmlFor='zip' className='block text-sm font-medium text-gray-700'>
              Zip Code
            </label>

            <input
              type='number'
              name='zip'
              id='zip'
              className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm'
              placeholder='zip'
            />
          </div>
        </div>

        <div className='w-full flex justify-center mt-8 mb-8'>
          <button
            type='submit'
            className='inline-flex items-center rounded-md border border-transparent bg-green-700 px-6 py-3 text-base font-medium text-green-200 hover:bg-green-200 hover:text-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2'
          >
            Save
          </button>
        </div>
      </form>
    </>
  )
}

export default EmployeeForm
