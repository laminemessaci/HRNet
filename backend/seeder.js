import colors from 'colors';
import dotenv from 'dotenv';
import connectDB from './config/dbConn.js';

import employees from './data/employees.js';
import users from './data/users.js';

import Employee from './models/Employee.js';
import User from './models/User.js';

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await Employee.deleteMany();
    await User.deleteMany();

    const createdUsers = await User.insertMany(users);

    const adminUserId = createdUsers[0]._id;

    const sampleEmployees = employees.map((employee) => {
      return { ...employee, user: adminUserId };
    });

    await Employee.insertMany(sampleEmployees);

    console.log(colors.bgMagenta('Data Imported!'));
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Employee.deleteMany();
    await User.deleteMany();

    console.log(colors.cyan('Data Destroyed!'));
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
