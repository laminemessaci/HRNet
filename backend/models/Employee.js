import mongoose from 'mongoose';

const addressSchema = new mongoose.Schema(
  {
    // employee: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   required: true,
    //   ref: 'Employee',
    // },
    street: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    zipCode: {
      type: String,
      required: true,
    },
    department: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const employeeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  birthDay: {
    type: Date,
    required: true,
  },
  startDay: {
    type: Date,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  // address: addressSchema,
  street: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  zipCode: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
  },
  email: {
    type: String,
  },
});

const Employee = mongoose.model('Employee', employeeSchema);
export default Employee;
