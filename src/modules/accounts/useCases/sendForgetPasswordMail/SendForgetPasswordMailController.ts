import { Request, Response } from "express";
import { container } from "tsyringe";
import { SendForgetPasswordMailUseCase } from "./SendForgetPasswordMailUseCase";

class SendForgetPasswordMailController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { email } = request.body;

    const sendForgetPasswordMailUseCase = container.resolve(
      SendForgetPasswordMailUseCase
    );

    await sendForgetPasswordMailUseCase.execute(email);

    return response.send();
  }
}

export { SendForgetPasswordMailController };
