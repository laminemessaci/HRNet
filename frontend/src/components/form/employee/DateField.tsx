import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import DatePicker from 'react-datepicker'

interface IDatePicker {
  placeholderText: string
  selectedField: Date
  callbackFn: (date: Date) => void
  text: string | null
  name: string
}
interface ICalendarContainer {
  className: string
  children: React.ReactNode
}

const DateField: React.FC<IDatePicker> = (props) => {
  const { placeholderText, selectedField, callbackFn, text } = props

  const calendarContainer = ({ className, children }: ICalendarContainer) => {
    return (
      <div className='p-1 bg-green-500 rounded-md'>
        <div className={className}>
          <div className='bg-gray-200 text-center text-red-600'>{text}</div>
          <div className='relative'>{children}</div>
        </div>
      </div>
    )
  }

  return (
    <>
      <DatePicker
        placeholderText={placeholderText}
        selected={selectedField}
        onChange={callbackFn}
        isClearable
        dateFormat='dd/MM/yyyy'
        peekNextMonth
        // customInput={<p className='text-red-500'>{'errors.birthDay.message'}</p>}
        calendarContainer={calendarContainer}
        closeOnScroll={true}
        showMonthDropdown
        showYearDropdown
        dropdownMode='select'
        popperClassName='some-custom-class'
        popperPlacement='bottom-start'
        required
        popperModifiers={[
          {
            name: 'offset',
            options: {
              offset: [5, 10],
            },
          },
          {
            name: 'preventOverflow',
            options: {
              rootBoundary: 'viewport',
              tether: false,
              altAxis: true,
            },
          },
        ]}
        className=' mt-1 w-full rounded border-gray-300 focus:border-green-500 focus:ring-green-500 placeholder:text-xs sm:placeholder:text-sm'
      />

      <FontAwesomeIcon className='w-5 relative left-[80%] bottom-8' icon={faCalendarAlt} color='green' />
    </>
  )
}

export default DateField
