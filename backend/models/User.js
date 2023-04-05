import colors from 'cli-color';
import mongoose from 'mongoose';

const generatePassword = () => {
  var length = 3,
    charset = 'abcdefghijklmnopqrstuvwxyz0123456789',
    retVal = '';
  for (var i = 0, n = charset.length; i < length; ++i) {
    retVal += charset.charAt(Math.floor(Math.random() * n));
  }
  console.log(colors.red(retVal));
  return retVal;
};
const color = function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
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
    // default: `https://ui-avatars.com/api/?background=65a30d&color=fff&name=John+Doe`,
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

userSchema.pre('save', async function (next) {
  //   if (!this.isModified('password')) {
  //     next();
  //   }
  if (!this.avatar)
    this.avatar = `https://ui-avatars.com/api/?background=${color()}&color=fff&name=${
      this.firstName
    }+${this.lastName}`;
  // this.password = await generatePassword();
  next();
});

const User = mongoose.model('User', userSchema);
export default User;
