import { NextFunction, Request, Response } from "express";
import UserModel from "./../models/user";
import { UserDocument } from "../types/user.interface";
import { Error } from "mongoose";

const normalizeUser = (user: UserDocument) => {
  return {
    email: user.email,
    username: user.username,
    id: user.id,
  };
};

export const register = async (
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
      return res.status(422).json(messages);
    }
    next(err);
  }
};
