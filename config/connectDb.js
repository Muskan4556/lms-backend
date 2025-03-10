// ⭐ IMPORT MONGOOSE ⭐
import mongoose from 'mongoose';
import envConfig from './envConfig.js'
// CREATE FUNCTION TO CONNECT DAATABASE ⭐⭐
const connectDb = async () => {
  try {
    await mongoose.connect(envConfig.mongo_uri, {
      dbName: envConfig.db_name,
      useNewUrlParser: true,
      useUnifiedTopology: true,

    });

    console.log('Database Connected Successfully');
  } catch (error) {
    console.log(error.message);
  }
}
// 🤷‍♂️ EXPORT DATABASE FUNCTION 🧑‍💻
export default connectDb;

