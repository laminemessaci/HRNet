const mongoose = require('mongoose');
const color = require('cli-color');

mongoose.set('strictQuery', true);
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log(`MongoDB Connected to ${color.cyan(conn.connection.host)}`);
  } catch (error) {
    console.error(`Error: ${color.red(error.message)}`);
    process.exit(1);
  }
};

module.exports = connectDB;
