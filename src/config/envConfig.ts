
import {config} from 'dotenv'

config();

const envConfig = {
  // Your environment variables here
  port :process.env.PORT,
  db: process.env,
  db_name:process.env.DB_NAME
}

export default envConfig;