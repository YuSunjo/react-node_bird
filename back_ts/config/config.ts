import * as dotenv from 'dotenv';

dotenv.config();

type Config = {
  username: string,
  password: string,
  database: string,
  host: string,
  [key: string]: string,
}

interface IConfigGroup {
  development: Config;
  test: Config;
  production: Config;
}
export const config: IConfigGroup = {
  "development": {
    "username": "root",
    "password": process.env.DB_PASSWORD!,
    "database": "react-nodebird_ts",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": process.env.DB_PASSWORD!,
    "database": "react-nodebird_ts",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": process.env.DB_PASSWORD!,
    "database": "react-nodebird_ts",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}

export default config;