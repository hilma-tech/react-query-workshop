import { config } from "dotenv";
import { readFileSync } from "fs";
import { join } from "path";
import { DataSource, DataSourceOptions } from "typeorm";
import { privateSecret } from "./setEnv";

export function getOptions(): DataSourceOptions {
  return {
    type: "mysql",
    host: privateSecret.mysqlSecret.host,
    port: Number(privateSecret.mysqlSecret.port),
    database: privateSecret.mysqlSecret.dbname,
    username: privateSecret.mysqlSecret.username,
    password: privateSecret.mysqlSecret.password,
    logging: process.env.TYPEORM_LOGGING?.toLowerCase() === "on",
    synchronize: process.env.TYPEORM_SYNC?.toLowerCase() === "on",

    ssl: process.env.DB_SSL
      ? {
          cert: readFileSync(process.env.DB_SSL),
        }
      : undefined,

    migrations: ["dist/migrations/*.migration{.ts,.js}"],
    migrationsRun: true,

    entities: ["dist/**/*.entity{.ts,.js}"],
  };
}

if (process.env.MIGRATION) {
  config({ path: join(__dirname, "../.env.development") });
}
export const dataSource = process.env.MIGRATION ? new DataSource(getOptions()) : {};
