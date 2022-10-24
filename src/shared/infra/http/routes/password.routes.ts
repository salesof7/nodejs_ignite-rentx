import { Router } from "express";
import { ResetPasswordUserController } from "../../../../modules/accounts/useCases/resetPasswordUser/ResetPasswordUserController";
import { SendForgetPasswordMailController } from "../../../../modules/accounts/useCases/sendForgetPasswordMail/SendForgetPasswordMailController";

const passwordRoutes = Router();

const sendForgetPasswordMailController = new SendForgetPasswordMailController();
const resetPasswordUserController = new ResetPasswordUserController();

passwordRoutes.post("/forgot", sendForgetPasswordMailController.handle);

passwordRoutes.post("/reset", resetPasswordUserController.handle);

export { passwordRoutes };
