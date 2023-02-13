/* eslint-disable react/prop-types */
import { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { CalendarIcon } from '@heroicons/react/24/outline'
import DatePicker from 'react-datepicker'
import { useForm, Controller } from 'react-hook-form'
import { departments } from './../../../utils/Department'
import { states } from './../../../utils/States'
import DateField from './DateField'
import DataListField from './DataListField'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAddressBook, faAddressCard } from '@fortawesome/free-solid-svg-icons'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const EmployeeForm = () => {
  const [departement, setDepartment] = useState(departments[0])
  const [selctedState, setSelectedState] = useState(states[0])

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()

  const onSubmit = async (data) => {
    console.log(data)
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className='w-4/5 sm:w-2/5 mx-auto mt-8'>
        <div className='flex lg:flex-row  flex-col  justify-between'>
          <div className='lg:w-1/2 m-1'>
            <label htmlFor='firstname' className='block text-sm font-medium text-gray-700'>
              Firstname
            </label>

            <input
              {...register('firstname', { required: true })}
              type='text'
              name='firstname'
              id='firstname'
              className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm'
              placeholder='Firstname'
            />
            {errors.firstname && <p className='text-red-500'>Please enter a Firstname</p>}
          </div>
          <div className='lg:w-1/2 m-1'>
            <label htmlFor='lastname' className='block text-sm font-medium text-gray-700'>
              Lastname
            </label>
            <input
              {...register('lastname', { required: true })}
              type='text'
              name='lastname'
              id='lastname'
              className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm'
              placeholder='Lastname'
            />
            {errors.lastname && <p className='text-red-500'>Please enter a Lastname</p>}
          </div>
        </div>
        <div className='mt-8'>
          <label htmlFor='birthDate' className='block text-sm font-medium text-gray-700'>
            Date of Birth
          </label>
          <Controller
            name='birthDate'
            control={control}
            defaultValue={new Date()}
            render={({ field }) => (
              <>
                <DateField
                  text='What is your birth day?'
                  name='birthDate'
                  placeholderText='Select the date of birth'
                  selectedField={field.value}
                  callbackFn={(date) => field.onChange(date)}
                />
                {errors.birthDate && <p className='text-red-500'>{errors.birthDate.message}</p>}
              </>
            )}
          />
        </div>
        <div className='mt-8 '>
          <label htmlFor='startdate' className='block text-sm font-medium text-gray-700'>
            Start Date
          </label>

          <Controller
            name='startDate'
            defaultValue={new Date()}
            control={control}
            render={({ field }) => (
              <>
                <DateField
                  text='What is your start day?'
                  name='birthDate'
                  placeholderText='Select the start date'
                  selectedField={field.value}
                  callbackFn={(date) => field.onChange(date)}
                />
                {errors.startDate && <p className='text-red-500'>{errors.startDate.message}</p>}
              </>
            )}
          />
          <Controller
            name='department'
            control={control}
            defaultValue={departments[0]}
            render={({ field: { onChange } }) => (
              <DataListField
                list={departments}
                value={departement}
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
            <label htmlFor='zip' className='block text-sm font-medium text-gray-700'>
              Zip Code
            </label>

            <input
              {...register('zip', { required: true, pattern: /^[0-9]+$/ })}
              type='number'
              name='zip'
              id='zip'
              className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm'
              placeholder='zip'
            />
            {errors.zip && <p className='text-red-500'>Please enter a valid zip code</p>}
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
