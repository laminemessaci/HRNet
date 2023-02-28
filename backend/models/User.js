const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  roles: {
    type: [String],
    default: ['Employee'],
  },
  active: {
    type: Boolean,
    default: true,
  },
  avatar: {
    type: String,
    default: `https://ui-avatars.com/api/?background=65a30d&color=fff&name=John+Doe`,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  phone: {
    type: String,
  },
  department: {
    type: String,
    default: 'Marketing',
  },
});

userSchema.pre('save', async function (next) {
  //   if (!this.isModified('password')) {
  //     next();
  //   }
  this.avatar = `https://ui-avatars.com/api/?background=65a30d&color=fff&name=${this.firstName}+${this.lastName}`;
  next();
});

module.exports = mongoose.model('User', userSchema);
