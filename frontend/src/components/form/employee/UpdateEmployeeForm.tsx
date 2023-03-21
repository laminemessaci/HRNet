/* eslint-disable react/prop-types */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { faAddressCard } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState, useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { NavigateFunction, useNavigate } from 'react-router'
import isEqual from 'lodash/isEqual'
import { useGetEmployeesQuery, useUpdateEmployeeMutation } from '../../../features/employees/EmployeesApiSlice'
import { useGetUsersQuery } from '../../../features/users/usersApiSlice'
import { departments, IDepartment } from '../../../utils/Department'
import { IState, states } from '../../../utils/States'
import { navigateTo } from '../../../utils/index'
import { FormInputs } from './CreateEmployee'
import DataListField from './DataListField'
import { useToast } from '../../../notifications/ToastProvider'

interface IProps {
  id: string
  setIsOpen: (isOpen: boolean) => void
}

const UpdateForm: React.FC<IProps> = ({ id, setIsOpen }): JSX.Element => {
  const { employee } = useGetEmployeesQuery('employeesList', {
    selectFromResult: ({ data }) => ({
      employee: data?.entities[id],
    }),
  })

  const toast = useToast()

  const initialValues = {
    department: departments.find((dept) => dept.name === employee?.department),
    state: states.find((state) => state.name === employee?.state),
    street: employee?.street,
    zipCode: employee?.zipCode,
    city: employee?.city,
  }
  const [department, setDepartment] = useState<IDepartment>(initialValues.department)
  const [selctedState, setSelectedState] = useState<IState>(initialValues.state)
  const [errorState, setErrorState] = useState<string>('')
  const [errorDept, setErrorDept] = useState<string>('')
  const [alert, setAlert] = useState<boolean>(false)
  const navigate = useNavigate<NavigateFunction>()

  const [formState, setFormState] = useState(initialValues)

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormInputs>()

  const [updateEmployee, { isLoading: isUpdateLoading, isSuccess: isUpdateSuccess, error: isUpdatError }] =
    useUpdateEmployeeMutation()
  // const { roles, username } = useAuth()
  const { users } = useGetUsersQuery('usersList', {
    selectFromResult: ({ data }) => ({
      users: data?.ids.map((id) => data?.entities[id]),
    }),
  })

  const onSubmit = async (data) => {
    const { firstName, lastName, birthDay, startDay, id } = employee

    const { department: department, state: state, street, zipCode, city } = data
    if (department.name === 'Select Your Department') {
      setErrorDept('Please select your department !')
      return
    }
    if (state.name === 'Select Your State') {
      setErrorState('Please select your state !')
      return
    }
    if (isEqual(initialValues, { department, state, zipCode, city, street })) {
      toast?.pushError('No changes detected !')
      return
    }
    try {
      const { isError, error } = await updateEmployee({
        id,
        firstName,
        lastName,
        startDay,
        birthDay,
        department: department.name,
        state: state.name,
        street: formState.street,
        zipCode: formState.zipCode,
        city: formState.city,
      })
      // setAlert(true)
      // toast?.pushSuccess(` ${employee.lastName} ${employee.firstName} is updated successfully !`)
      // reset()
      setSelectedState(selctedState)
      setDepartment(department)
      setIsOpen(false)
      // location.reload()
      //  navigateTo('/home/employees-list', navigate)
      if (error || isError) {
        console.log(error)
        toast?.pushError(error)
      }
    } catch (error) {
      console.log(error)
      // setGlobalError(error)
      toast?.pushError(error)
    }
  }
  useEffect(() => {
    if (isUpdateSuccess) {
      toast?.pushSuccess('Employee updated successfully !')
      navigateTo('/home/employees-list', navigate)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isUpdateSuccess])

  return (
    <>
      {/* {globalError && <p className='flex justify-center text-red-500'>{globalError}</p>} */}

      <form onSubmit={handleSubmit(onSubmit)} className='w-4/5 sm:w-4/5 mx-auto mt-16 bg-zinc-200 p-4 rounded-md'>
        {/* {alert ? (
          <div className='mb-4 rounded-lg bg-green-600 py-5 px-6 text-base text-success-700' role='alert'>
            {employee.lastName} has been updated successfully !
          </div>
        ) : null} */}
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
              defaultValue={employee.firstName}
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
              defaultValue={employee.lastName}
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
            defaultValue={department}
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
              //   defaultValue={initialValues.street}
              onChange={(e) => {
                console.log(e.target.value)
                setFormState({ ...formState, street: e.target.value })
              }}
              id='street'
              value={formState.street.trim()}
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
                // defaultValue={employee.zipCode}
                onChange={(e) => {
                  console.log(e.target.value)
                  setFormState({ ...formState, zipCode: e.target.value.trim() })
                }}
                value={formState.zipCode.trim()}
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
                // defaultValue={employee.city}
                onChange={(e) => {
                  console.log(e.target.value)
                  setFormState({ ...formState, city: e.target.value })
                }}
                value={formState.city.trim()}
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
              defaultValue={selctedState}
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
