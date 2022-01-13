import { Dialect } from "sequelize/dist";
import dotenv from 'dotenv';

dotenv.config();

const sql = {
  database: 'mydb' as string,
  username: 'root' as string,
  password: process.env.SQL_PASSWORD,
  config: {
    host: '35.227.190.120',
    dialect: "mysql" as Dialect,
  },
};

export default sql;
