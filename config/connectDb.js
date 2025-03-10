import mongoose from 'mongoose';
import envConfig from './envConfig.js';

const connectDb = async () => {
  try {
    if (!envConfig.mongo_uri) {
      throw new Error("MongoDB URI is undefined! Check your .env file.");
    }

    await mongoose.connect(envConfig.mongo_uri, {
      dbName: envConfig.db_name, 
    });

    console.log('Database Connected Successfully');
  } catch (error) {
    console.error("Database Connection Error:", error.message);
  }
};

export default connectDb;
