import color from 'cli-color';
import Mongoose from 'mongoose';
import Employee from '../models/Employee.js';

const toObjId = (id) => {
  return Types.ObjectId(id);
};

// @desc Get all employees
// @route GET /employees
// @access Private
const getAllEmployees = async (req, res) => {
  // console.log(color.cyan('Get all Employees', req.body));
  // Get all employees from MongoDB
  const employees = await Employee.find().lean();
  // console.log(color.cyan(employees));

  // If no employees
  if (!employees?.length) {
    return res.status(400).json({ message: 'No employees found' });
  }

  res.json(employees);
};

// @desc Create new employee
// @route POST /employees
// @access Private
const createNewEmployee = async (req, res) => {
  const newEmployee = await new Employee({
    ...req.body,
  });

  const {
    user,
    firstName,
    lastName,
    birthDay,
    startDay,
    street,
    city,
    state,
    zipCode,
    department,
  } = newEmployee;

  // Confirm data
  if (
    !user ||
    !lastName ||
    !firstName ||
    !birthDay ||
    !startDay ||
    !street ||
    !city ||
    !state ||
    !zipCode ||
    !department
  ) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  // Check for duplicate employee
  const duplicate = await Employee.findOne({ lastName, firstName })
    .collation({ locale: 'en', strength: 2 })
    .lean()
    .exec();

  if (duplicate) {
    return res.status(409).json({ message: 'Duplicate employee' });
  }

  const employee = await Employee.create(newEmployee);

  if (employee) {
    //created
    res.status(201).json({ message: `New employee ${lastName} created` });
  } else {
    res.status(400).json({ message: 'Invalid employee data received' });
  }
};

// @desc Update a employee
// @route PATCH /employees
// @access Private
const updateEmployee = async (req, res) => {
  //  console.log(color.cyan(req.body.id));

  const {
    firstName,
    lastName,
    birthDay,
    street,
    city,
    state,
    zipCode,
    department,
  } = req.body;
  const id = req.body.id;
  const objId = Mongoose.Types.ObjectId(id);

  // Confirm data
  if (!department || !street || !city || !zipCode) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  // Does the employee exist to update?
  const employee = await Employee.findById(objId);
  //console.log(color.green(employee));

  if (!employee) {
    return res.status(400).json({ message: 'Employee not found' });
  }

  // Check for duplicate
  const duplicate = await Employee.findOne({ lastName, firstName, birthDay })
    .collation({ locale: 'en', strength: 2 })
    .lean()
    .exec();

  // Allow updates to the original employee
  if (duplicate && duplicate?._id.toString() !== id) {
    return res.status(409).json({ message: 'Duplicate employee' });
  }

  employee.lastName = lastName;
  employee.firstName = firstName;
  employee.birthDay = birthDay;
  employee.city = city;
  employee.street = street;
  employee.zipCode = zipCode;
  employee.state = state;
  employee.department = department;

  const updatedEmployee = await employee.save();

  res.json({ message: `${updatedEmployee.firstName} updated` });
};

// @desc Delete a employee
// @route DELETE /employees
// @access Private
const deleteEmployee = async (req, res) => {
  const id = req.body.id;
  const objId = Mongoose.Types.ObjectId(id);
  // console.log(color.cyan(id, objId));

  // Confirm data
  if (!id) {
    return res.status(400).json({ message: 'Employee ID Required' });
  }

  // Does the employee exist to delete?
  const employee = await Employee.findById(objId);

  if (!employee) {
    return res.status(400).json({ message: 'Employee not found' });
  }

  const result = await employee.deleteOne();

  const reply = `Employee ${result.firstName} with ID ${result._id} deleted !`;

  res.json(reply);
};

export { getAllEmployees, createNewEmployee, updateEmployee, deleteEmployee };
