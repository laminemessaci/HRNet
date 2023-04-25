/* eslint-disable react/prop-types */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import axios from 'axios'

import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import ReactLoading from 'react-loading'
import { NavigateFunction, useNavigate } from 'react-router'

import { useAddNewUserMutation, useGetUsersQuery } from '../../../features/usersApiSlice.js'
import { IDepartment, departments } from '../../../utils/Department'
import { navigateTo } from '../../../utils/index'
import Loader from '../../Loader'
import Message from '../../Message'
import DataListField from '../employee/DataListField'
import { ROLES } from './../../../config/roles'
import { useToast } from './../../../notifications/ToastProvider'

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

const roleOptions = () => {
  const rolesObject = []
  Object.keys(ROLES).map((role, index) => {
    const obj = { id: index, name: role }
    rolesObject.push(obj)
  })
  return rolesObject
}

/**
 * * Create User Form
 * @returns {JSXElement}
 */

const UserForm: React.FC = (): JSX.Element => {
  const options = roleOptions()

  const [department, setDepartment] = useState<IDepartment>(departments[0])
  const [role, setRoles] = useState(options[0])
  const [firstName, setFirstName] = useState<string>('')
  const [lastName, setLastName] = useState<string>('')
  const [image, setImage] = useState<string>('')
  const [phone, setPhone] = useState<string>('')
  const [uploading, setUploading] = useState(false)
  const [errorRole, setErrorRole] = useState<string>('')
  const [errorDept, setErrorDept] = useState<string>('')
  const [errorAvatar, setErrorAvatar] = useState<boolean>(false)
  const [globalError, setGlobalError] = useState<string>('')

  const navigate = useNavigate<NavigateFunction>()

  const toast = useToast()

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormInputs>()

  const [addNewUser, { isLoading, isSuccess, error }] = useAddNewUserMutation()
  // const { roles, email } = useAuth()

  // console.log('username', username, roles)
  const { users } = useGetUsersQuery('usersList', {
    selectFromResult: ({ data }) => ({
      users: data?.ids.map((id) => data?.entities[id]),
    }),
  })

  // console.log('users', users)
  useEffect(() => {
    // if (errorDept) setErrorDept('')
    // if (errorRole) setErrorRole('')
  }, [navigate])

  if (!users?.length || isLoading) return <Loader type='spokes' color='green' width={200} height={200} />

  const onRolesChanged = (e) => {
    console.log('e.target.value', e.name)
    // const values = Array.from(
    //   e, // HTMLCollection
    //   (option) => option,
    // )
    // console.log('values', values)
    setRoles(e.name)
  }

  const uploadFileHandler = async (e) => {
    const acceptedImageTypes = ['image/gif', 'image/jpg', 'image/jpeg', 'image/png']
    const file = e.target.files[0]
    // console.log('file Type:: ', file['type'])
    if (!acceptedImageTypes.includes(file['type'])) {
      setErrorAvatar(true)
      toast?.pushError('Please upload a valid image file !')
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

      const { data } = await axios.post('/api/upload', formData, config)

      setImage(data)
      setUploading(false)
      toast?.pushSuccess('Image updated successfully !')
    } catch (error) {
      console.error(error)
      setUploading(false)
      toast?.pushError('Error while uploading image !')
    }
  }

  const onSubmit = async (data) => {
    const { firstName, lastName, department: department, phone, email } = data
    if (department.name === 'Select Your Department') {
      setErrorDept('Please select your department !')
      return
    }
    if (errorAvatar) {
      toast?.pushError('Please upload a valid image file !')
      return
    }

    try {
      window.scrollTo(0, 0)
      const { isError, error } = await addNewUser({
        // user: userCreator[0]._id,
        email,
        firstName,
        avatar: image,
        lastName,
        phone,
        department: department.name,
        roles: [role.name],
      })
      if (isSuccess) {
        reset()
        setRoles(options[0])
        setDepartment(departments[0])
      }
      if (error || isError) return
      navigateTo('/admin/users-list', navigate)
    } catch (error) {
      console.log(error)
      setGlobalError(error)
    }
  }

  return (
    <>
      {error && <Message>{error.data['message']}</Message>}
      {globalError && <p className='flex justify-center text-red-500'>{globalError}</p>}
      <form onSubmit={handleSubmit(onSubmit)} className='w-4/5 sm:w-2/5 mx-auto mt-8 '>
        <div className=' border rounded-md p-4 mt-8 bg-green-200 mb-8'>
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
                  src={image || '/avatar.png'}
                  alt='Avatar Upload'
                />
              </div>
              <label className='cursor-pointer mt-6' id='avatar'>
                <span className='mt-2 text-base leading-normal px-4 py-2 bg-green-500 text-white text-sm rounded-full'>
                  Select Avatar
                </span>
                <input type='file' name='image' id='image' className='hidden' onChange={uploadFileHandler} />
              </label>
            </div>
          </div>
          <div className='flex lg:flex-row  flex-col  justify-between my-8'>
            <div className='lg:w-1/2 m-1'>
              <label htmlFor='firstName' className='block text-sm font-medium text-gray-700' id='firstname'>
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
              <label htmlFor='lastName' className='block text-sm font-medium text-gray-700' id='lastname'>
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
            <div className='lg:w-1/2 m-1'>
              <label htmlFor='email' className='block text-sm font-medium text-gray-700' id='email'>
                Email
              </label>

              <input
                {...register('email', { required: true })}
                type='email'
                name='email'
                id='email'
                className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm'
                placeholder='Email'
              />
              {errors.email && <p className='text-red-500'>Please enter a Email</p>}
            </div>

            <div className='lg:w-1/2 m-1'>
              <label htmlFor='phone' className='block text-sm font-medium text-gray-700' id='phone'>
                Phone
              </label>

              <input
                {...register('phone', { required: true })}
                type='tel'
                name='phone'
                id='phone'
                className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm'
                placeholder='Phone'
              />
              {errors.phone && <p className='text-red-500'>Please enter a Phone</p>}
            </div>
          </div>

          <div className='flex lg:flex-row  flex-col  justify-between'>
            <div className='mt-6 lg:w-1/2 flex justify-end'>
              <div className='w-full'>
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
            </div>
            <div className='mt-6 lg:w-1/2'>
              <Controller
                name='roles'
                control={control}
                defaultValue={options[0].name}
                render={({ field: { onChange } }) => (
                  <DataListField
                    list={options}
                    value={role}
                    onChange={(e) => {
                      onChange(e)
                      onRolesChanged(e)
                      setRoles(e)
                      setErrorRole('')
                    }}
                  />
                )}
              ></Controller>
              {errorRole && <p className='text-red-500'>{errorRole}</p>}
            </div>
          </div>

          <div className='w-full flex justify-center mt-8 mb-8'>
            <button
              // disabled={errorAvatar || errorRole || errorDept || errors}
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
        </div>
      </form>
    </>
  )
}

export default UserForm
