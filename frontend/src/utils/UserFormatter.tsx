import moment from 'moment'

// function convertDate(inputFormat) {
//   function pad(s) {
//     return s < 10 ? '0' + s : s
//   }
//   const d = new Date(inputFormat)
//   return [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join('/')
// }

interface IUser {
  firstName: string
  lastName: string
  email: string
  createdAt: string
  id: string
  key: string
  department: string
  avatar: string
  active: boolean
  roles: string
}

export default class UserFormatter implements IUser {
  constructor(user: IUser) {
    console.log('user=== ', user)
    this.key = user.id
    this.firstName = user.firstName
    this.lastName = user.lastName
    this.department = user.department
    this.createdAt = moment(user.createdAt).format('DD/MM/YYYY')
    this.email = user.email
    this.id = user.id
    this.avatar = user.avatar
    this.active = user.active
    this.roles = user.roles
  }
  roles: string
  firstName: string
  lastName: string
  email: string
  createdAt: string
  id: string
  key: string
  department: string
  avatar: string
  active: boolean
}
