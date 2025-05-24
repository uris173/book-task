import { Request } from "express";
import { Types } from "mongoose";

interface UserRequestInterface {
  _id: Types.ObjectId | string;
  login: string;
  role: "admin" | "user";
  status: "active" | "banned";
};

declare global {
  namespace Express {
    interface User extends UserRequestInterface {};
  }
};