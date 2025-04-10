import { NextFunction, Request, Response, RequestHandler } from "express";
import UserModel from "./../models/user";
import { UserDocument } from "../types/user.interface";
import { Error } from "mongoose";
import jwt from "jsonwebtoken";
import { config } from "./../config";
import { ExpressRequestInterface } from "../types/expressRequest.interface";

const normalizeUser = (user: UserDocument) => {
  const token = jwt.sign({ id: user.id, email: user.email }, config.JWT_SECRET);
  return {
    email: user.email,
    username: user.username,
    id: user.id,
    token: `Bearer ${token}`,
  };
};

export const register: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const newUser = new UserModel({
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
    });
    const savedUser = await newUser.save();
    res.send(normalizeUser(savedUser));
  } catch (err) {
    if (err instanceof Error.ValidationError) {
      const messages = Object.values(err.errors).map((err) => err.message);
      res.status(422).json(messages);
    } else {
      next(err);
    }
  }
};

export const login: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email }).select(
      "+password"
    );
    const errors = { emailOrPassword: "Incorrect email/password" };

    if (!user) {
      res.status(422).json(errors);
      return;
    }

    const isSamePassword = await user.validatePassword(req.body.password);

    if (!isSamePassword) {
      res.status(422).json(errors);
      return;
    }

    res.send(normalizeUser(user));
  } catch (err) {
    next(err);
  }
};

export const currentUser: RequestHandler = (
  req: ExpressRequestInterface,
  res: Response,
  next: NextFunction
) => {
  if (!req.user) {
    res.sendStatus(401);
    return;
  }
  res.send(normalizeUser(req.user));
};
