import express from "express";
import "express-async-errors";

import "reflect-metadata";
import swaggerUi from "swagger-ui-express";

import { router } from "./routes";
import { AppDataSource } from "./database";
import swaggerFile from "./swagger.json";
import "./shared/container";

import { handleAppError } from "./middlewares/handleAppError";

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");

    const app = express();

    app.use(express.json());

    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

    app.use(router);

    app.use(handleAppError);

    app.listen(4000, () => console.log("Server is running!"));
  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err);
  });
