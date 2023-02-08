const color = require('colors');
const bcrypt = require('bcrypt');
const Employee = require('../models/Employee');

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
  // console.log(color.cyan(newEmployee));

  const {
    firstName,
    lastName,
    birthDay,
    street,
    city,
    state,
    zipCode,
    department,
  } = newEmployee;

  // Confirm data
  if (
    !lastName ||
    !firstName ||
    !birthDay ||
    !street ||
    !city ||
    !state ||
    !zipCode ||
    !department
  ) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  // Check for duplicate employee
  const duplicate = await Employee.findOne({ lastName, firstName, birthDay })
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
  const { _id, firstName, lastName, birthDay, address } = req.body;

  // Confirm data
  if (!firstName || !lastName || !birthDay || !address) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  // Does the employee exist to update?
  const employee = await Employee.findById(_id).exec();

  if (!employee) {
    return res.status(400).json({ message: 'Employee not found' });
  }

  // Check for duplicate
  const duplicate = await Employee.findOne({ lastName, firstName, birthDay })
    .collation({ locale: 'en', strength: 2 })
    .lean()
    .exec();

  // Allow updates to the original employee
  if (duplicate && duplicate?._id.toString() !== _id) {
    return res.status(409).json({ message: 'Duplicate employee' });
  }

  employee.lastName = lastName;
  employee.firstName = firstName;
  employee.birthDay = birthDay;
  employee.address = address;

  const updatedUser = await employee.save();

  res.json({ message: `${updatedUser.firstName} updated` });
};

// @desc Delete a employee
// @route DELETE /employees
// @access Private
const deleteEmployee = async (req, res) => {
  const id = req.params.id;

  // Confirm data
  if (!id) {
    return res.status(400).json({ message: 'Employee ID Required' });
  }

  // Does the employee exist to delete?
  const employee = await Employee.findById(id).exec();

  if (!employee) {
    return res.status(400).json({ message: 'Employee not found' });
  }

  const result = await employee.deleteOne();

  const reply = `Employee ${result.firstName} with ID ${result._id} deleted !`;

  res.json(reply);
};

module.exports = {
  getAllEmployees,
  createNewEmployee,
  updateEmployee,
  deleteEmployee,
};
