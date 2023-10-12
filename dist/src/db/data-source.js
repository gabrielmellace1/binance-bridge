"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const dotenv_1 = __importDefault(require("dotenv"));
const index_1 = require("./entity/index");
dotenv_1.default.config();
const { DB_USERNAME, DB_HOST, DB_SCHEMA, DB_PASSWORD, DB_DIALECT, DB_PORT, DB_SYNC, DB_LOG } = process.env;
exports.AppDataSource = new typeorm_1.DataSource({
    type: DB_DIALECT,
    host: DB_HOST,
    port: parseInt(DB_PORT || "3306"),
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: `${DB_SCHEMA}`,
    synchronize: DB_SYNC === "true",
    logging: DB_LOG === "true",
    // migrationsRun: true,
    maxQueryExecutionTime: 20000,
    entities: [index_1.Payment],
    migrations: [],
    subscribers: [],
});
