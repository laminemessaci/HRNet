import React, { Fragment } from 'react'

import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { classNames } from '../../../utils'
import { departments, IDepartement } from '../../../utils/Department'
import { IState } from '../../../utils/States'

interface IDatalist {
  list: IState[] | IDepartement[]
  value: IState
  onChange: () => void
}

const DataListField: React.FC<IDatalist> = ({ list, value, onChange }: IDatalist): JSX.Element => {
  console.log(list === departments)
  return (
    <Listbox value={value} onChange={onChange}>
      {({ open }) => (
        <>
          <div className={classNames(list === departments ? 'w-full sm:w-full mx-auto' : 'w-11/12 sm:w-1/2 mx-auto')}>
            <Listbox.Label className='block text-sm font-medium text-gray-700'>
              {list === departments ? 'Department' : 'State'}
            </Listbox.Label>
            <div className='relative mt-1'>
              <Listbox.Button className='relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500 sm:text-sm'>
                <span className='block truncate'>{value.name}</span>
                <span className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2'>
                  <ChevronUpDownIcon className='h-5 w-5 text-gray-400' aria-hidden='true' />
                </span>
              </Listbox.Button>

              <Transition
                show={open}
                as={Fragment}
                leave='transition ease-in duration-100'
                leaveFrom='opacity-100'
                leaveTo='opacity-0'
              >
                <Listbox.Options className='absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
                  {list.map((elt) => (
                    <Listbox.Option
                      key={elt.id}
                      className={({ active }) =>
                        classNames(
                          active ? 'text-white bg-green-600' : 'text-gray-900',
                          'relative cursor-default select-none py-2 pl-3 pr-9',
                        )
                      }
                      value={elt}
                    >
                      {({ value, active }: any) => (
                        <>
                          <span className={classNames(value ? 'font-semibold' : 'font-normal', 'block truncate')}>
                            {elt.name}
                          </span>

                          {value ? (
                            <span
                              className={classNames(
                                active ? 'text-white' : 'text-green-600',
                                'absolute inset-y-0 right-0 flex items-center pr-4',
                              )}
                            >
                              <CheckIcon className='h-5 w-5' aria-hidden='true' />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </div>
        </>
      )}
    </Listbox>
  )
}

export default DataListField
