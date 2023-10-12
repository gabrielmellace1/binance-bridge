import {  DataSource } from "typeorm";
import dotenv from "dotenv";
import {
   Payment} from "./entity/index";
dotenv.config();

const {
  DB_USERNAME,
  DB_HOST,
  DB_SCHEMA,
  DB_PASSWORD,
  DB_DIALECT,
  DB_PORT,
  DB_SYNC,
  DB_LOG
} = process.env;

export const AppDataSource = new DataSource({
    type: DB_DIALECT as "mysql",
    host: DB_HOST,
    port: parseInt(DB_PORT || "3306"),
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: `${DB_SCHEMA}`,
    synchronize: DB_SYNC === "true",
    logging: DB_LOG === "true",
    // migrationsRun: true,
    maxQueryExecutionTime: 20000,
    entities: [Payment],
    migrations: [],
    subscribers: [],
  });
