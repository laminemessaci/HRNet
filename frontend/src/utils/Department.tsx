import { v4 as uuidv4 } from 'uuid'

export type IDepartment = {
  id: string
  name: string
}[]

export const departments: IDepartment = [
  {
    id: uuidv4(),
    name: 'Select Your Department',
  },
  { id: uuidv4(), name: 'Sales' },
  { id: uuidv4(), name: 'Marketing' },
  { id: uuidv4(), name: 'Engineering' },
  { id: uuidv4(), name: 'Human Resources' },
  { id: uuidv4(), name: 'Legal' },
]
