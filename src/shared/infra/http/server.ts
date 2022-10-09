import express, { Request, Response, NextFunction } from "express";
import "express-async-errors";

import "reflect-metadata";
import swaggerUi from "swagger-ui-express";

import { router } from "./routes";
import { AppDataSource } from "../typeorm";
import swaggerFile from "../../../swagger.json";
import "../../container";
import { AppError } from "../../errors/AppError";

function handleAppError(
  err: Error,
  request: Request,
  response: Response,
  next: NextFunction
) {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: "error",
      message: err.message,
    });
  }

  return response.status(500).json({
    status: "error",
    message: `Internal Server Error: ${err.message}`,
  });
}

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");

    const app = express();

    app.use(express.json());

    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

    app.use(router);

    app.use(
      (
        err: Error,
        request: Request,
        response: Response,
        next: NextFunction
      ) => {
        if (err instanceof AppError) {
          return response.status(err.statusCode).json({
            status: "error",
            message: err.message,
          });
        }

        return response.status(500).json({
          status: "error",
          message: `Internal Server Error: ${err.message}`,
        });
      }
    );

    app.listen(4000, () => console.log("Server is running!"));
  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err);
  });
