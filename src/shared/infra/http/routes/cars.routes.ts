import { Router } from "express";
import multer from "multer";

import uploadConfig from "../../../../config/upload";

import { CreateCarController } from "../../../../modules/cars/useCases/createCar/CreateCarController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ListAvailableCarController } from "../../../../modules/cars/useCases/listAvailableCars/ListAvailableCarsController";
import { CreateCarSpecificationController } from "../../../../modules/cars/useCases/createCarSpecification/CreateCarSpecificationController";
import { UploadCarImagesController } from "../../../../modules/cars/useCases/uploadCarImages/UploadCarImagesController";

const createCarController = new CreateCarController();
const listAvailableCarController = new ListAvailableCarController();
const createCarSpecificationController = new CreateCarSpecificationController();
const uploadCarImagesController = new UploadCarImagesController();

const carsRoutes = Router();

const upload = multer(uploadConfig.upload("./tmp/cars"));

carsRoutes.post(
  "/",
  ensureAuthenticated,
  ensureAdmin,
  createCarController.handle
);

carsRoutes.get("/available", listAvailableCarController.handle);

carsRoutes.post(
  "/specifications/:id",
  ensureAuthenticated,
  ensureAdmin,
  createCarSpecificationController.handle
);

carsRoutes.post(
  "/images/:id",
  ensureAuthenticated,
  ensureAdmin,
  upload.array("images"),
  uploadCarImagesController.handle
);

export { carsRoutes };
