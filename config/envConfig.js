import { config } from "dotenv";
import process from "process";

config();
const envConfig = {
  // Your environment variables here
  port: process.env.PORT,
  db: process.env,
  db_name: process.env.DB_NAME,
  mongo_uri: process.env.DB_URL,
  node_env: process.env.NODE_ENV,
  jwt_secret_key: process.env.JWT_SECRET_KEY,
};

export default envConfig;
