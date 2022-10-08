import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { AppError } from "../errors/AppError";
import { UsersRepository } from "../modules/accounts/repositories/implementations/UsersRepository";

interface IPayload {
  sub: string;
}

function verifyTokenAuthenticity(authHeader: string): string {
  const [, token] = authHeader.split(" ");
  const { sub: user_id } = verify(
    token,
    "9eb71ab7420eb452a22787ca4fab501b"
  ) as IPayload;
  return user_id;
}

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError("Token missing", 401);
  }

  let user_id: string;
  try {
    user_id = verifyTokenAuthenticity(authHeader);
  } catch (error) {
    throw new AppError("Invalid token!", 401);
  }

  const usersRepository = new UsersRepository();

  const user = await usersRepository.findById(user_id);

  if (!user) {
    throw new AppError("This user does not exist!", 401);
  }

  request.user = {
    id: user_id,
  };

  next();
}
