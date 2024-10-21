import pg from "pg";
import config from "./config.js";


export const pool = new pg.Pool({
  user: config.DB_USER,
  host: config.DB_HOST,
  database: config.DB_DATABASE,
  password: config.DB_PASSWORD,
  port: config.DB_PORT,
});



