import { DataSource } from "typeorm";
import { User } from "../../../modules/accounts/infra/typeorm/entities/User";
import { UserTokens } from "../../../modules/accounts/infra/typeorm/entities/UserTokens";
import { Car } from "../../../modules/cars/infra/typeorm/entities/Car";
import { CarImage } from "../../../modules/cars/infra/typeorm/entities/CarImage";
import { Category } from "../../../modules/cars/infra/typeorm/entities/Category";
import { Specification } from "../../../modules/cars/infra/typeorm/entities/Specification";
import { Rental } from "../../../modules/rentals/infra/typeorm/entities/Rental";

const AppDevelopment = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "docker",
  password: "ignite",
  database: "rentx",
  migrations: ["./src/shared/infra/typeorm/migrations/*.ts"],
  migrationsTableName: "migrations",
  entities: [Category, Specification, User, Car, CarImage, Rental, UserTokens],
});

const AppTest = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "docker",
  password: "ignite",
  database: "rentx_test",
  migrations: ["./src/shared/infra/typeorm/migrations/*.ts"],
  migrationsTableName: "migrations",
  entities: [Category, Specification, User, Car, CarImage, Rental, UserTokens],
});

const isDevelopment = process.env.NODE_ENV === "development";

export const AppDataSource = isDevelopment ? AppDevelopment : AppTest;

if (isDevelopment) {
  AppDataSource.initialize()
    .then(() => {
      console.log("Data Source has been initialized!");
    })
    .catch((err) => {
      console.error("Error during Data Source initialization", err);
    });
}
