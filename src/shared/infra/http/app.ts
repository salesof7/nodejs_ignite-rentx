import express, { Request, Response, NextFunction } from "express";
import "express-async-errors";
import "dotenv/config";

import "reflect-metadata";
import swaggerUi from "swagger-ui-express";

import { router } from "./routes";
import swaggerFile from "../../../swagger.json";
import "../../container";
import { AppError } from "../../errors/AppError";

const app = express();

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(router);

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
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

export { app };
