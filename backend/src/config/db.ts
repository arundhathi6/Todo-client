import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

export const connect = () => {
  return mongoose.connect(process.env.MONGO_URI as string);
};
