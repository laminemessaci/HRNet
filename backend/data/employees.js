import { departments, states } from '../utils/staticData.js';

const employees = [
  {
    firstName: 'Tony',
    lastName: 'Stack',
    birthDay: '1984-01-26T10:50:25.839Z',
    startDay: '2006-08-26T10:50:25.839Z',
    street: '2223 Washington Street',
    city: 'Corpus Christi',
    state: states[22].name,
    zipCode: '78401',
    department: departments[5].name,
  },
  {
    firstName: 'Tony',
    lastName: 'Stack',
    birthDay: '1991-01-26T10:50:25.839Z',
    startDay: '2020-09-20T10:50:25.839Z',
    street: '4394 Rockwell Lane',
    city: 'Kingston',
    state: states[12].name,
    zipCode: '28501',
    department: departments[2].name,
  },
  {
    firstName: 'Carolina',
    lastName: 'Hears',
    birthDay: '1988-05-12T14:50:25.839Z',
    startDay: '2009-07-06T15:50:25.839Z',
    street: '3790 Rhode Island Avenue',
    city: 'Washington',
    state: states[19].name,
    zipCode: '20005',
    department: departments[1].name,
  },
  {
    firstName: 'Yon',
    lastName: 'Tailor',
    birthDay: '1977-04-20T12:50:25.839Z',
    startDay: '1999-08-26T13:50:25.839Z',
    street: '316 North Avenue',
    city: 'Florida',
    state: states[4].name,
    zipCode: '68846',
    department: departments[4].name,
  },
  {
    firstName: 'Sam',
    lastName: 'Doe',
    birthDay: '1994-05-16T11:40:25.839Z',
    startDay: '2013-12-06T10:50:25.839Z',
    street: '2223 Washington Street',
    city: 'Atlas',
    state: states[5].name,
    zipCode: '48411',
    department: departments[3].name,
  },
];

export default employees;
