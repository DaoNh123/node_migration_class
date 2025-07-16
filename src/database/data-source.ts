import "dotenv/config";
import { DataSource } from "typeorm";
import { Teacher } from "../entities/Teacher"; // entity của bạn
import { Student } from "../entities/Student"; // entity của bạn

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  // port: Number(process.env.TYPEORM_PORT),
  port: 5433,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
  synchronize: false,
  logging: false,
  entities: ["src/entities/**/*.ts"],
  migrations: ["src/database/migration/**/*.ts"],
});
