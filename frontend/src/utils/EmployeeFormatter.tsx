import moment from 'moment'

// function convertDate(inputFormat) {
//   function pad(s) {
//     return s < 10 ? '0' + s : s
//   }
//   const d = new Date(inputFormat)
//   return [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join('/')
// }

export default class EmployeesFormat {
  key: string
  firstName: string
  lastName: string
  startDay: string
  department: string
  birthDay: string
  street: string
  city: string
  state: string
  zipCode: string

  constructor(employee: IEmployee) {
    // console.log('employee===', employee?.birthDay)
    this.key = employee.id
    this.firstName = employee.firstName
    this.lastName = employee.lastName
    this.startDay = moment(employee.startDate).format('DD/MM/YYYY')
    this.department = employee.department
    this.birthDay = moment(employee.birthDay).format('DD/MM/YYYY')
    this.street = employee.street
    this.city = employee.city
    this.state = employee.state
    this.zipCode = employee.zipCode
  }
}

interface IEmployee {
  zipCode: string
  firstName: string
  lastName: string
  startDate: Date
  birthDay: Date
  id: string
  key: string
  startDay: Date
  department: string
  street: string
  city: string
  state: string
}
