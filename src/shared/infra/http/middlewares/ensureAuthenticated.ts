import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { AppError } from "../../../errors/AppError";
import auth from "../../../../config/auth";

interface IPayload {
  sub: string;
}

function verifyTokenAuthenticity(token: string): string {
  const { sub: user_id } = verify(token, auth.secret_token) as IPayload;
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

  const [, token] = authHeader.split(" ");

  let user_id: string;
  try {
    user_id = verifyTokenAuthenticity(token);
  } catch (error) {
    throw new AppError("Invalid token!", 401);
  }

  request.user = {
    id: user_id,
  };

  next();
}
