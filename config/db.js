import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

export const db = new Sequelize(process.env.DB_NAME, process.env.DB_USER , process.env.DB_PASS, {
  dialect: "mysql",
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  pool: {
    max:5,
    min:0,
    acquire: 30000,
    idle: 10000
  }
});
