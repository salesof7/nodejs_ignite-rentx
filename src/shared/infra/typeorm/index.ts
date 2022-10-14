import { DataSource } from "typeorm";
import { User } from "../../../modules/accounts/infra/typeorm/entities/User";
import { Car } from "../../../modules/cars/infra/typeorm/entities/Car";
import { CarImage } from "../../../modules/cars/infra/typeorm/entities/CarImage";
import { Category } from "../../../modules/cars/infra/typeorm/entities/Category";
import { Specification } from "../../../modules/cars/infra/typeorm/entities/Specification";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "docker",
  password: "ignite",
  database: "rentx",
  migrations: ["./src/shared/infra/typeorm/migrations/*.ts"],
  migrationsTableName: "migrations",
  entities: [Category, Specification, User, Car, CarImage],
});
