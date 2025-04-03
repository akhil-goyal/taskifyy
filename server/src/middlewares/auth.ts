import { NextFunction, Response, RequestHandler } from "express";
import jwt from "jsonwebtoken";
import UserModel from "../models/user";
import { ExpressRequestInterface } from "../types/expressRequest.interface";
import { config } from "../config";

// Explicitly type the middleware as a RequestHandler
const authMiddleware: RequestHandler = async (
  req: ExpressRequestInterface,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      res.sendStatus(401); // No explicit return
      return; // Exit early, typed as void
    }

    const token = authHeader.split(" ")[1];
    const data = jwt.verify(token, config.JWT_SECRET) as {
      id: string;
      email: string;
    };
    const user = await UserModel.findById(data.id);

    if (!user) {
      res.sendStatus(401); // No explicit return
      return; // Exit early, typed as void
    }

    req.user = user;
    next();
  } catch (err) {
    res.sendStatus(401); // No explicit return
  }
};

export default authMiddleware;
