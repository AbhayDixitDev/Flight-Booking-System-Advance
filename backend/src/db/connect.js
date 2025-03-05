// src/db/connect.js
import mongoose from 'mongoose';
import { DB_NAME } from '../config/constants.js';

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB connected on host: ${connection.connection.host}`);
  } catch (error) {
    // console.error('MongoDB connection error:', error);
    throw error; // re-throw to handle in server.js
  }
};

export default connectDB;
