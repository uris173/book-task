import { Types } from "mongoose";

export interface UserInterface {
  _id: Types.ObjectId | string;
  login: string;
  password: string;
  role: "admin" | "user";
  status: "active" | "banned";
  createdAt: Date;
  updatedAt: Date;
};