import bcrypt from 'bcrypt';
import color from 'colors';
import Mongoose from 'mongoose';
import Employee from '../models/Employee.js';
import User from '../models/User.js';

// @desc Get all users
// @route GET /users
// @access Private
const getAllUsers = async (req, res) => {
  // Get all users from MongoDB
  const users = await User.find().select('-password').lean();

  // If no users
  if (!users?.length) {
    return res.status(400).json({ message: 'No users found' });
  }

  res.json(users);
};

// @desc Create new user
// @route POST /users
// @access Private
const createNewUser = async (req, res) => {
  const newUser = await new User({
    ...req.body,
  });

  const {
    email,
    password,
    roles,
    firstName,
    lastName,
    avatar,
    department,
    phone,
  } = newUser;
  console.log(color.cyan(newUser));

  // Confirm data
  if (!email || !password || !lastName || !firstName || !department) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  // Check for duplicate email
  const duplicate = await User.findOne({ email })
    .collation({ locale: 'en', strength: 2 })
    .lean()
    .exec();

  if (duplicate) {
    return res.status(409).json({ message: 'Duplicate email' });
  }

  // Hash password
  const hashedPwd = await bcrypt.hash(password, 10); // salt rounds

  const userObject = {
    email,
    password: hashedPwd,
    roles,
    firstName,
    lastName,
    avatar,
    department,
    phone,
  };

  // Create and store new user
  const user = await User.create(userObject);

  if (user) {
    //created
    res.status(201).json({ message: `New user ${email} created` });
  } else {
    res.status(400).json({ message: 'Invalid user data received' });
  }
};

// @desc Update a user
// @route PATCH /users
// @access Private
const updateUser = async (req, res) => {
  const {
    id,
    email,
    roles,
    active,
    password,
    department,
    phone,
    avatar,
    firstName,
    lastName,
  } = req.body;
  console.log(color.cyan(req.body));

  // Confirm data
  if (
    !id ||
    !email ||
    !Array.isArray(roles) ||
    !roles.length ||
    typeof active !== 'boolean'
  ) {
    return res
      .status(400)
      .json({ message: 'All fields except password are required' });
  }

  // Does the user exist to update?
  const user = await User.findById(id).exec();

  if (!user) {
    return res.status(400).json({ message: 'User not found' });
  }

  // Check for duplicate
  const duplicate = await User.findOne({ email })
    .collation({ locale: 'en', strength: 2 })
    .lean()
    .exec();

  // Allow updates to the original user
  if (duplicate && duplicate?._id.toString() !== id) {
    return res.status(409).json({ message: 'Duplicate email' });
  }

  user.email = email;
  user.roles = roles;
  user.active = active;
  user.department = department;
  user.phone = phone;
  user.password = password;
  user.firstName = firstName;
  user.lastName = lastName;
  user.avatar = avatar;

  // Update the user

  if (password) {
    // Hash password
    user.password = await bcrypt.hash(password, 10); // salt rounds
  }

  const updatedUser = await user.save();

  res.json({ message: `${updatedUser.email} updated` });
};

// @desc Delete a user
// @route DELETE /users
// @access Private
const deleteUser = async (req, res) => {
  const { id } = req.body;
  const objId = Mongoose.Types.ObjectId(id);
  // console.log(color.cyan(id));

  // Confirm data
  if (!id) {
    return res.status(400).json({ message: 'User ID Required' });
  }

  // Does the user still have assigned employees?
  const employee = await Employee.findOne({ user: objId }).lean().exec();
  if (employee) {
    return res.status(400).json({ message: 'User has assigned employees' });
  }

  // Does the user exist to delete?
  const user = await User.findById(objId);

  if (!user) {
    return res.status(400).json({ message: 'User not found' });
  }

  const result = await user.deleteOne();

  const reply = `Username ${result.email} with ID ${result._id} deleted`;

  res.json(reply);
};

export { getAllUsers, createNewUser, updateUser, deleteUser };

