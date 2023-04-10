import bcrypt from 'bcryptjs';

const users = [
  {
    email: 'admin@hr.net',
    password: bcrypt.hashSync('123', 10),
    roles: ['Admin'],
    firstName: 'John',
    lastName: 'Doe',
    department: 'Marketing',
    phone: '+977 9955221114',
  },
  {
    email: 'manager@hr.net',
    password: bcrypt.hashSync('123', 10),
    roles: ['Manager'],
    firstName: 'Carolina',
    lastName: 'Dexter',
    department: 'Sales',
    phone: '+977 99021235',
  },
  {
    email: 'employee@hr.net',
    password: bcrypt.hashSync('123', 10),
    roles: ['Employee'],
    firstName: 'Stephan',
    lastName: 'Malls',
    department: 'Legal',
    phone: '+977 9915001202',
  },
];

export default users;
