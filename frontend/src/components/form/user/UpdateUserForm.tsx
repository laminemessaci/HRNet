/* eslint-disable react/prop-types */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import axios from 'axios'
import React, { useEffect, useState, useCallback } from 'react'
import { Controller, useForm } from 'react-hook-form'
import ReactLoading from 'react-loading'
import { NavigateFunction, useNavigate } from 'react-router'
import { ROLES } from '../../../config/roles'
import { useGetUsersQuery, useUpdateUserMutation } from '../../../features/usersApiSlice'
import { departments, IDepartment } from '../../../utils/Department'
import Loader from '../../Loader'
import DataListField from '../employee/DataListField'
import { useToast } from './../../../notifications/ToastProvider'
import { navigateTo } from './../../../utils/index'
import Message from './../../Message'
import { FormInputs } from './CreateUser'
import useAuth from './../../../hooks/useAuth'

interface IProps {
  id: string
  setIsOpen: (isOpen: boolean) => void
  fromUser?: boolean | true
}

export interface IRoles {
  id: number
  name: string
}

const UpdateUserForm: React.FC<IProps> = ({ id, setIsOpen, fromUser = false }): JSX.Element => {
  const roleOptions = () => {
    const rolesObject = []
    Object.keys(ROLES).map((role, index) => {
      const obj = { id: index, name: role }
      rolesObject.push(obj)
    })
    return rolesObject
  }

  const { user } = useGetUsersQuery('usersList', {
    selectFromResult: ({ data }) => ({
      user: data?.entities[id],
    }),
  })
  const initialValues = {
    department: departments?.find((dept) => dept.name === user?.department),
    active: user?.active,
    roles: { id: 0, name: user?.roles[0] }, // Employee by default
    email: user?.email,
    phone: user?.phone,
    avatar: user?.avatar,
  }

  const [department, setDepartment] = useState<IDepartment>(initialValues.department)
  const [active, setActive] = useState<boolean>(initialValues.active)
  const [roles, setRoles] = useState<IRoles[]>(initialValues.roles)
  const [errorRole, setErrorRole] = useState<string>('')
  const [errorDept, setErrorDept] = useState<string>('')
  const [uploading, setUploading] = useState(false)

  const [avatar, setAvatar] = useState<string>(initialValues.avatar)
  const [errorAvatar, setErrorAvatar] = useState<boolean>(false)

  const navigate = useNavigate<NavigateFunction>()

  const toast = useToast()
  const { roles: userRoles } = useAuth()

  const {
    control,
    register,
    handleSubmit,
    reset,
    watch,
    getValues,
    formState: { errors },
  } = useForm<FormInputs>({ mode: 'onTouched' })

  const options = roleOptions()

  const [updateUser, { isLoading: isUpdateLoading, isSuccess: isUpdateSuccess, error: isUpdatError }] =
    useUpdateUserMutation()

  const uploadFileHandler = async (e) => {
    const acceptedImageTypes = ['image/gif', 'image/jpg', 'image/jpeg', 'image/png']
    const file = e.target.files[0]
    // console.log('file Type:: ', file['type'])
    if (!acceptedImageTypes.includes(file['type'])) {
      setErrorAvatar(true)
      return
    }
    setErrorAvatar(false)
    const formData = new FormData()
    formData.append('image', file)
    setUploading(true)

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }

      const { data, status } = await axios.post('/api/upload', formData, config)

      setAvatar(data)
      setUploading(false)
    } catch (error) {
      console.error(error)
      setErrorAvatar(true)
      setUploading(false)
    }
  }

  const onActiveChanged = () => {
    console.log('changer', active)
    setActive((active) => !active)
  }

  // const onRolesChanged = (e) => {
  //   const values = Array.from(e.target.selectedOptions, (option) => option.value)
  //   setRoles(values)
  // }
  const onSubmit = useCallback(async (data) => {
    const { id, firstName, lastName } = user
    const { email, phone, password } = data

    if (department.name === 'Select Your Department') {
      setErrorDept('Please select your department !')
      return
    }
    if (errorAvatar) return

    try {
      const { isError, error } = await updateUser({
        id,
        firstName,
        lastName,
        email,
        password,
        phone,
        roles: [roles.name],
        active,
        department: department?.name,
        avatar,
      })

      reset()

      setDepartment(departments[0])
      if (!fromUser) setIsOpen(false)

      if (error || isError) return
    } catch (error) {
      console.log(error)
      toast?.pushError(error)
    }
  })

  useEffect(() => {
    if (errorDept) setErrorDept('')
    if (errorRole) setErrorRole('')
    if (isUpdateSuccess) {
      toast?.pushSuccess('User updated successfully !')
      if (!fromUser) {
        navigateTo('/admin/users-list', navigate)
      } else {
        navigateTo('/home', navigate)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate, isUpdateSuccess, id])

  if (!department) return <Loader type='bubbles' color='green' height={200} width={200} />

  return (
    <>
      {isUpdatError && <Message>{isUpdatError.data['message']}</Message>}

      <form onSubmit={handleSubmit(onSubmit)} className='w-4/5 sm:w-4/5 mx-auto mt-16 bg-zinc-200 p-4 rounded-md'>
        <div className='py-3 flex justify-center mx-auto'>
          {uploading && (
            <div className='absolute flex justify-center my-16'>
              {' '}
              <ReactLoading type='spokes' color='green' width={40} height={40} />
            </div>
          )}
          <div className='bg-white px-4 py-5 rounded-lg shadow-lg text-center w-48'>
            <div className='mb-4'>
              <img
                className='w-auto mx-auto rounded-full object-cover object-center'
                src={avatar || 'https://user.oc-static.com/users/avatars/1579109717362_me1.jpg'}
                alt='Avatar Upload'
              />
            </div>
            <label className='cursor-pointer mt-6'>
              <span className='mt-2 text-base leading-normal px-4 py-2 bg-green-500 text-white text-sm rounded-full'>
                Select Avatar
              </span>
              <input type='file' name='image' id={user?.avatar} className='hidden' onChange={uploadFileHandler} />
            </label>
          </div>
        </div>
        {errorAvatar && <p className='text-red-500'>Please enter a valid format (png, jpeg ... )</p>}
        <div className='flex lg:flex-row  flex-col  justify-between'>
          <div className='lg:w-1/2 m-1'>
            <label htmlFor='firstName' className='block text-sm font-medium text-gray-700'>
              Firstname
            </label>

            <input
              disabled
              type='text'
              name='firstName'
              id={user?.firstName}
              defaultValue={user.firstName}
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
              defaultValue={user.lastName}
              id={user?.lastName}
              className='mt-1 block w-full bg-gray-300 rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm'
              placeholder='Lastname'
            />
          </div>
        </div>
        <div className='lg:w-auto m-1'>
          <label htmlFor='email' className='block text-sm font-medium text-gray-700'>
            Email
          </label>
          <input
            {...register('email', { required: true })}
            type='email'
            name='email'
            defaultValue={user.email}
            id={user?.email}
            className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm'
            placeholder='email'
          />
          {errors.email && <p className='text-red-500'>Please enter a Email</p>}
        </div>
        <div className='lg:w-auto m-1'>
          <label htmlFor='phone' className='block text-sm font-medium text-gray-700'>
            Phone
          </label>
          <input
            {...register('phone', { required: true })}
            type='text'
            name='phone'
            defaultValue={user.phone}
            id={user?.phone}
            className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm'
            placeholder='Phone'
          />
          {errors.phone && <p className='text-red-500'>Please enter a Phone number</p>}
        </div>
        <div className='lg:w-auto m-1'>
          <label htmlFor='password' className='block text-sm font-medium text-gray-700'>
            Password
          </label>
          <input
            {...register('password', { required: true })}
            type='password'
            name='password'
            defaultValue={user.password}
            id={user?.password}
            className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm'
            placeholder='Your Password'
          />
          {errors.password && <p className='text-red-500'>Please enter your new password!</p>}
        </div>
        <div className='flex lg:flex-row  flex-col   justify-between'>
          <div className='mt-6  lg:w-1/2'>
            <Controller
              name='department'
              control={control}
              defaultValue={user ? department : null}
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
          {userRoles.includes('Admin', 'Manager') && (
            <div className='mt-6 lg:w-1/2'>
              <Controller
                name='roles'
                id='roles'
                control={control}
                defaultValue={roles}
                render={({ field: { onChange } }) => (
                  <DataListField
                    list={options}
                    value={roles}
                    onChange={(e) => {
                      // console.log('e ===== ', e)
                      onChange(e)
                      setRoles(e)
                      setErrorRole('')
                    }}
                  />
                )}
              ></Controller>
              {errorRole && <p className='text-red-500'>{errorRole}</p>}
            </div>
          )}
        </div>
        {userRoles.includes('Admin', 'Manager') && (
          <div className='flex items-center mt-4'>
            <label htmlFor={user?.id} className='ml-2 text-sm font-medium text-gray-900 dark:text-gray-300'>
              Active
            </label>
            <input
              id={user?.id}
              type='checkbox'
              checked={active}
              onChange={onActiveChanged}
              className='w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-lime-500 dark:focus:ring-lime-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
            />
          </div>
        )}

        <div className='w-full flex justify-center mt-8 mb-8'>
          <button
            type='submit'
            disabled={errorAvatar}
            className='inline-flex mr-2 items-center rounded-md border border-transparent bg-green-700 px-6 py-3 text-base font-medium text-green-200 hover:bg-green-200 hover:text-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2'
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

export default UpdateUserForm
