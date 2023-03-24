import mongoose from 'mongoose';
import color from 'cli-color';

mongoose.set('strictQuery', true);
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log(
      `MongoDB Connected to ${color.cyanBright(conn.connection.host)}`
    );
  } catch (error) {
    console.error(`Error: ${color.redBright(error.message)}`);
    process.exit(1);
  }
};

export default connectDB;
