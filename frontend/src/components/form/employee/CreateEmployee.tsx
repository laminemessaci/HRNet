/* eslint-disable react/prop-types */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { faAddressCard } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import Modal from 'customized-modal-react'
import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { NavigateFunction, useNavigate } from 'react-router'

import { useAddNewEmployeeMutation } from '../../../features/EmployeesApiSlice.js'
import { useGetUsersQuery } from '../../../features/usersApiSlice.js'
import useAuth from '../../../hooks/useAuth'
import { IDepartment, departments } from '../../../utils/Department'
import { IState, states } from '../../../utils/States'
import Loader from '../../Loader'
import Message from '../../Message'
import DataListField from './DataListField'
import DateField from './DateField'

export interface FormInputs {
  firstName: string
  lastName: string
  startDay: Date
  birthDay: Date
  department: { name: string }
  state: { name: string }
  street: string
  zipCode: string
  city: string
  country: string
}

const EmployeeForm: React.FC = (): JSX.Element => {
  const [department, setDepartment] = useState<IDepartment>(departments[0])
  const [selectedState, setSelectedState] = useState<IState>(states[0])
  const [errorState, setErrorState] = useState<string>('')
  const [errorDept, setErrorDept] = useState<string>('')
  const [globalError, setGlobalError] = useState<string>('')

  const [isOpen, setIsOpen] = useState(false)

  const navigate = useNavigate<NavigateFunction>()

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormInputs>()

  const [addNewEmployee, { isLoading, isSuccess, error }] = useAddNewEmployeeMutation()
  const { email } = useAuth()

  const { users } = useGetUsersQuery('usersList', {
    selectFromResult: ({ data }) => ({
      users: data?.ids.map((id: string | number) => data?.entities[id]),
    }),
  })

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        setIsOpen(false)
      }, 3000)
    }
    // navigateTo('/home/employees-list', navigate)
  }, [isOpen])

  if (!users?.length || isLoading) return <Loader type='spokes' color='green' width={200} height={200} />

  const onSubmit = async (data: {
    firstName: any
    lastName: any
    startDay: any
    birthDay: any
    department: any
    state: any
    street: any
    zipCode: any
    city: any
  }) => {
    const userCreator = users.filter((user: { email: string }) => user.email == email)

    const { firstName, lastName, startDay, birthDay, department: department, state: state, street, zipCode, city } = data
    if (department.name === 'Select Your Department') {
      setErrorDept('Please select your department !')
      return
    }
    if (state.name === 'Select Your State') {
      setErrorState('Please select your state !')
      return
    }
    try {
      window.scrollTo(0, 0)
      const { isError, error } = await addNewEmployee({
        user: userCreator[0]._id,
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

      // toast?.success('Employee created successfully !')
      if (error || isError) return
      setIsOpen(true)

      // _.throttle(() => navigateTo('/home/employees-list', navigate), 3000)
    } catch (error) {
      console.log(error)
      setGlobalError(error)
    }
  }

  return (
    <section className='h-full'>
      {error && <Message>{error.data['message']}</Message>}
      {globalError && <p className='flex justify-center text-red-500'>{globalError}</p>}

      {isOpen ? (
        <div className='h-screen w-full'>
          <Modal
            setIsOpen={() => setIsOpen((prev) => !prev)}
            darkMode={true}
            title='Employee created successfully'
            close
            check={true}
            checkSize={'3rem'}
            button
          />
        </div>
      ) : (
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
                control={control}
                defaultValue={new Date()}
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
                <DataListField<IDepartment>
                  list={departments}
                  value={department}
                  onChange={(e) => {
                    onChange(e)
                    setDepartment(e)
                    setErrorDept('')
                  }}
                />
              )}
            ></Controller>
            {errorDept && <p className='text-red-500'>{errorDept}</p>}
          </div>

          <div className=' border mt-8 bg-green-200 mb-8'>
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
                  value={selectedState}
                  onChange={(e): void => {
                    onChange(e)
                    setSelectedState(e)
                    setErrorState('')
                  }}
                />
              )}
            ></Controller>
            {errorState && <p className='flex justify-center text-red-500'>{errorState}</p>}

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
          </div>
        </form>
      )}
    </section>
  )
}

export default EmployeeForm
