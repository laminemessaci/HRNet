const mongoose = require('mongoose');

const generatePassword = () => {
  var length = 5,
    charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
    retVal = '';
  for (var i = 0, n = charset.length; i < length; ++i) {
    retVal += charset.charAt(Math.floor(Math.random() * n));
  }
  return retVal;
};

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
    default: generatePassword(),
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
    default: '+33652012898',
  },
  department: {
    type: String,
    required: true,
    default: 'Marketing',
  },
});

// userSchema.pre('save', async function (next) {
//   //   if (!this.isModified('password')) {
//   //     next();
//   //   }
//   // this.avatar = `https://ui-avatars.com/api/?background=65a30d&color=fff&name=${this.firstName}+${this.lastName}`;
//   // this.password = await generatePassword();
//   next();
// });

module.exports = mongoose.model('User', userSchema);
