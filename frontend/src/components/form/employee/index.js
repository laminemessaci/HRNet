/* eslint-disable react/prop-types */
import { faAddressCard } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useAddNewEmployeeMutation } from '../../../features/employees/EmployeesApiSlice.js'
import { useGetUsersQuery } from '../../../features/users/usersApiSlice.js'
import Message from '../../Message'
import { departments } from './../../../utils/Department'
import { states } from './../../../utils/States'
import DataListField from './DataListField'
import DateField from './DateField'
import useAuth from './../../../hooks/useAuth'
import Loader from './../../Loader'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const EmployeeForm = () => {
  const [department, setDepartment] = useState(departments[0])
  const [selctedState, setSelectedState] = useState(states[0])

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()

  const [addNewEmployee, { isLoading, isSuccess, isError, error }] = useAddNewEmployeeMutation()
  const { roles, username } = useAuth()

  // console.log('username', username, roles)
  const { users } = useGetUsersQuery('usersList', {
    selectFromResult: ({ data }) => ({
      users: data?.ids.map((id) => data?.entities[id]),
    }),
  })

  if (!users?.length || isLoading) return <Loader type='spokes' color='green' width={200} height={200} />

  console.log('users', users)
  const currentUser = users.filter((user) => user.username === username)
  console.log('currentUser', currentUser[0]._id)

  const onSubmit = async (data) => {
    console.log(data)
    const { firstName, lastName, startDay, birthDay, department: department, state: state, street, zipCode, city } = data
    try {
      window.scrollTo(0, 0)
      await addNewEmployee({
        user: users[0].id,
        firstName,
        lastName,
        startDay,
        birthDay,
        department: department.name,
        state: state.name,
        street,
        zipCode,
        city,
      })
      reset()
      setSelectedState(states[0])
      setDepartment(departments[0])
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      {error && <Message>{error['message']}</Message>}
      <form onSubmit={handleSubmit(onSubmit)} className='w-4/5 sm:w-2/5 mx-auto mt-8'>
        <div className='flex lg:flex-row  flex-col  justify-between'>
          <div className='lg:w-1/2 m-1'>
            <label htmlFor='firstName' className='block text-sm font-medium text-gray-700'>
              Firstname
            </label>

            <input
              {...register('firstName', { required: true })}
              type='text'
              name='firstName'
              id='firstName'
              className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm'
              placeholder='Firstname'
            />
            {errors.firstName && <p className='text-red-500'>Please enter a Firstname</p>}
          </div>
          <div className='lg:w-1/2 m-1'>
            <label htmlFor='lastName' className='block text-sm font-medium text-gray-700'>
              Lastname
            </label>
            <input
              {...register('lastName', { required: true })}
              type='text'
              name='lastName'
              id='lastName'
              className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm'
              placeholder='Lastname'
            />
            {errors.lastName && <p className='text-red-500'>Please enter a Lastname</p>}
          </div>
        </div>

        <div className='flex lg:flex-row  flex-col  justify-between'>
          <div className='mt-8 lg:w-1/2 m-1'>
            <label htmlFor='birthDay' className='block text-sm font-medium text-gray-700'>
              Date of Birth
            </label>
            <Controller
              name='birthDay'
              control={control}
              defaultValue={new Date()}
              render={({ field }) => (
                <>
                  <DateField
                    text='What is your birth day?'
                    name='birthDay'
                    placeholderText='Select the date of birth'
                    selectedField={field.value}
                    callbackFn={(date) => field.onChange(date)}
                  />
                  {errors.birthDay && <p className='text-red-500'>{errors.birthDay.message}</p>}
                </>
              )}
            />
          </div>
          <div className='mt-8 lg:w-1/2 m-1 '>
            <label htmlFor='startdate' className='block text-sm font-medium text-gray-700'>
              Start Date
            </label>

            <Controller
              name='startDay'
              defaultValue={new Date()}
              control={control}
              render={({ field }) => (
                <>
                  <DateField
                    text='What is your start day?'
                    name='birthDay'
                    placeholderText='Select the start date'
                    selectedField={field.value}
                    callbackFn={(date) => field.onChange(date)}
                  />
                  {errors.startDay && <p className='text-red-500'>{errors.startDay.message}</p>}
                </>
              )}
            />
          </div>
        </div>
        <div className='mt-8'>
          <Controller
            name='department'
            control={control}
            defaultValue={departments[0]}
            render={({ field: { onChange } }) => (
              <DataListField
                list={departments}
                value={department}
                onChange={(e) => {
                  onChange(e)
                  setDepartment(e)
                }}
              />
            )}
          ></Controller>
        </div>

        <div className='adress border mt-8 bg-green-200 mb-8'>
          <h1 className='text-green-600 text-center mt-8'>
            <FontAwesomeIcon icon={faAddressCard} className='mx-2' />
            Address
          </h1>
          <div className='mt-8 w-11/12 sm:w-1/2 mx-auto'>
            <label htmlFor='street' className='block text-sm font-medium text-gray-700'>
              Street
            </label>

            <input
              {...register('street', { required: true })}
              type='text'
              name='street'
              id='street'
              className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm'
              placeholder='street'
            />
            {errors.street && <p className='text-red-500'>This field is required</p>}
          </div>
          <div className='mt-8 w-11/12 sm:w-1/2 mx-auto mb-8'>
            <label htmlFor='city' className='block text-sm font-medium text-gray-700'>
              City
            </label>

            <input
              {...register('city', { required: true })}
              type='text'
              name='city'
              id='city'
              className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm'
              placeholder='city'
            />
            {errors.city && <p className='text-red-500'>This field is required</p>}
          </div>
          <Controller
            name='state'
            control={control}
            defaultValue={states[0]}
            render={({ field: { onChange } }) => (
              <DataListField
                list={states}
                value={selctedState}
                onChange={(e) => {
                  onChange(e)
                  setSelectedState(e)
                }}
              />
            )}
          ></Controller>

          <div className='mt-8 w-11/12 sm:w-1/2 mx-auto mb-8'>
            <label htmlFor='zipCode' className='block text-sm font-medium text-gray-700'>
              Zip Code
            </label>

            <input
              {...register('zipCode', { required: true, pattern: /^[0-9]+$/ })}
              type='number'
              name='zipCode'
              id='zipCode'
              className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm'
              placeholder='zipCode'
            />
            {errors.zipCode && <p className='text-red-500'>Please enter a valid zipCode code</p>}
          </div>
        </div>

        <div className='w-full flex justify-center mt-8 mb-8'>
          <button
            type='submit'
            className='inline-flex mr-2 items-center  rounded-md border border-transparent bg-green-700 px-6 py-3 text-base font-medium text-green-200 hover:bg-green-200 hover:text-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2'
          >
            Save
          </button>
          {/* <button
            onClick={reset()}
            className='inline-flex items-center rounded-md border border-gray-200 shadow bg-white px-6 py-3 text-base font-medium text-green-700  hover:bg-green-200 hover:text-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2'
          >
            Cancel
          </button> */}
        </div>
      </form>
    </>
  )
}

export default EmployeeForm
