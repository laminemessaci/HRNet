import React from 'react'
import { CalendarIcon } from '@heroicons/react/24/outline'
import DatePicker from 'react-datepicker'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarAlt, faCalendarCheck, faCalendarDay, faSave } from '@fortawesome/free-solid-svg-icons'

interface IDatePicker {
  placeholderText: string
  selectedField: Date
  callbackFn: (date: Date) => void
  text: string | null
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
        dateFormat='dd/MM/yyyy'
        peekNextMonth
        calendarContainer={calendarContainer}
        closeOnScroll={true}
        showMonthDropdown
        showYearDropdown
        dropdownMode='select'
        popperClassName='some-custom-class'
        popperPlacement='bottom-start'
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

      <FontAwesomeIcon className='w-5 relative left-[90%] bottom-8' icon={faCalendarAlt} color='green' />
    </>
  )
}

export default DateField
