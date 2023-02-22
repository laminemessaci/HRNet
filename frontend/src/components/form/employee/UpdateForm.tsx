/* eslint-disable react/prop-types */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React, { useState } from 'react'
import Message from './../../Message'
import { Controller, useForm } from 'react-hook-form'
import DataListField from './DataListField'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAddressCard } from '@fortawesome/free-solid-svg-icons'
import { NavigateFunction, useNavigate } from 'react-router'
import { IState, states } from '../../../utils/States'
import { departments, IDepartment } from '../../../utils/Department'
import { FormInputs } from './index'
import { useUpdateEmployeeMutation } from '../../../features/employees/EmployeesApiSlice'
import useAuth from './../../../hooks/useAuth'

const UpdateForm: React.FC = (): JSX.Element => {
  const [department, setDepartment] = useState<IDepartment>(departments[0])
  const [selctedState, setSelectedState] = useState<IState>(states[0])
  const [errorState, setErrorState] = useState<string>('')
  const [errorDept, setErrorDept] = useState<string>('')
  const [globalError, setGlobalError] = useState<string>('')
  const navigate = useNavigate<NavigateFunction>()

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormInputs>()

  const [addNewEmployee, { isLoading, isSuccess, error }] = useUpdateEmployeeMutation()
  // const { roles, username } = useAuth()

  return (
    <>
      {/* {error && <Message>{error.data['message']}</Message>} */}
      {/* {globalError && <p className='flex justify-center text-red-500'>{globalError}</p>} */}
      <form onSubmit={() => console.log('test')} className='w-4/5 sm:w-4/5 mx-auto mt-16 bg-zinc-200 p-4 rounded-md'>
        <div className='flex lg:flex-row  flex-col  justify-between'>
          <div className='lg:w-1/2 m-1'>
            <label htmlFor='firstName' className='block text-sm font-medium text-gray-700'>
              Firstname
            </label>

            <input
              disabled
              type='text'
              name='firstName'
              id='firstName'
              value={'lamine'}
              className='mt-1 block w-full rounded-md bg-gray-300 border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm'
              placeholder='Firstname'
            />
          </div>
          <div className='lg:w-1/2 m-1'>
            <label htmlFor='lastName' className='block text-sm font-medium text-gray-700'>
              Lastname
            </label>
            <input
              disabled
              type='text'
              name='lastName'
              value={'messaci'}
              id='lastName'
              className='mt-1 block w-full bg-gray-300 rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm'
              placeholder='Lastname'
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

        <div className='adress border mt-8 bg-green-200 mb-8'>
          <h1 className='text-green-600 text-center mt-8'>
            <FontAwesomeIcon icon={faAddressCard} className='mx-2' />
            Address
          </h1>
          <div className='mt-8 w-11/12 sm:w-2/2 mx-auto'>
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

          <div className='flex lg:flex-row  flex-col '>
            <div className=' sm:w-1/2 mx-4 mb-8 mt-8'>
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

            <div className=' sm:w-1/2 mx-4 mb-8 mt-8'>
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
          </div>
          <div className='mb-6 '>
            <Controller
              name='state'
              control={control}
              defaultValue={states[0]}
              render={({ field: { onChange } }) => (
                <DataListField
                  list={states}
                  value={selctedState}
                  onChange={(e): void => {
                    onChange(e)
                    setSelectedState(e)
                    setErrorState('')
                  }}
                />
              )}
            ></Controller>
            {errorState && <p className='flex justify-center text-red-500'>{errorState}</p>}
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

export default UpdateForm
