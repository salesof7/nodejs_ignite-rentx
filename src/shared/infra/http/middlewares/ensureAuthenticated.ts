import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { AppError } from "../../../errors/AppError";
import { UsersRepository } from "../../../../modules/accounts/infra/typeorm/repositories/UsersRepository";
import { UsersTokensRepository } from "../../../../modules/accounts/infra/typeorm/repositories/UsersTokensRepository";
import auth from "../../../../config/auth";

interface IPayload {
  sub: string;
}

function verifyTokenAuthenticity(token: string): string {
  const { sub: user_id } = verify(token, auth.secret_refresh_token) as IPayload;
  return user_id;
}

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;
  const userTokenRepository = new UsersTokensRepository();

  if (!authHeader) {
    throw new AppError("Token missing", 401);
  }

  const [, token] = authHeader.split(" ");

  let user_id: string;
  try {
    user_id = verifyTokenAuthenticity(token);
  } catch (error) {
    throw new AppError("Invalid token!", 401);
  }

  const user = await userTokenRepository.findByUserIdAndRefreshToken(
    user_id,
    token
  );

  if (!user) {
    throw new AppError("This user does not exist!", 401);
  }

  request.user = {
    id: user_id,
  };

  next();
}
