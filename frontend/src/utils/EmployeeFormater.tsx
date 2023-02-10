import moment from 'moment'

function convertDate(inputFormat) {
  function pad(s) {
    return s < 10 ? '0' + s : s
  }
  const d = new Date(inputFormat)
  return [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join('/')
}

export default class EmployeesFormat {
  key: string
  firstname: string
  lastname: string
  startDate: Date
  department: string
  birthdate: Date
  street: string
  city: string
  state: string
  zip: string
  zipcode: any
  startdate: Date

  constructor(employee: IEmployee) {
    console.log('employee===', employee?.birthDay)
    this.key = employee.id
    this.firstname = employee.firstName
    this.lastname = employee.lastName
    this.startdate = moment(employee?.startDate).format('DD/MM/YYYY')
    this.department = employee.department
    this.birthdate = moment(employee?.birthDay).format('DD/MM/YYYY')
    this.street = employee.street
    this.city = employee.city
    this.state = employee.state
    this.zip = employee.zipCode
  }
}

interface IEmployee {
  firstName: string
  lastName: string
  startDate: Date
  birthDay: Date
  zipCode: any
  id: string
  key: string
  firstname: string
  lastname: string
  startdate: Date
  department: string
  birthdate: Date
  street: string
  city: string
  state: string
  zipcode: string
}