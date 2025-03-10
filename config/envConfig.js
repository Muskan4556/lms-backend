
import { config } from 'dotenv';
config();
const envConfig = {
  // Your environment variables here
  port :process.env.PORT,
  db: process.env,
  db_name:process.env.DB_NAME,
  mongo_uri:process.env.DB_URL,
  node_env :process.env.NODE_ENV,
}

export default envConfig;