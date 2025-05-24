import { Request, Response } from "express";
import { UserModel } from "../models/user";
import { verify as jwtVerify, sign } from "jsonwebtoken";
import { hash, verify } from "argon2";

import { UserInterface } from "../interfaces/user";
import { LoginPasswordInterface } from "../interfaces/auth";

import { LoginPasswordValidation } from "../validations/auth";

const select = "-__v -createdAt -updatedAt";

const generateToken = (user: UserInterface, generate: boolean | undefined, withRefresh: boolean | undefined) => {
  const payload = {
    _id: user._id,
    login: user.login,
    role: user.role,
  };

  let accessToken: string | null = null;
  let refreshToken: string | null = null;

  if (generate) {
    accessToken = sign({ _id: user._id }, process.env.ACCESS_SECRET!, {
      expiresIn: "1h",
    });
  }
  if (withRefresh) {
    refreshToken = sign({ _id: user._id }, process.env.REFRESH_SECRET!, {
      expiresIn: "7d",
    });
  }

  return {
    ...(generate && { accessToken, expiresIn: 3600 }),
    ...(withRefresh && { refreshToken }),
    user: payload,
  };
}

export const createAdmin = async (req: Request, res: Response) => {
  try {
    let { error } = LoginPasswordValidation(req.body);
    if (error) {
      res.status(400).json({ message: error.details[0].message });
      return;
    } 

    let { login, password } = req.body as LoginPasswordInterface;

    let findAdmin = await UserModel.findOne({ role: "admin" }, "_id");
    if (findAdmin) {
      res.status(400).json({ message: "Admin already exists!" })
      return;
    }

    await UserModel.create({ login, password: await hash(password), role: "admin" });

    res.status(201).json({ message: "Admin created!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error!" });
  }
};

export const registration = async (req: Request, res: Response) => {
  try {
    let { error } = LoginPasswordValidation(req.body);
    if (error) {
      res.status(400).json({ message: error.details[0].message });
      return;
    } 

    let { login, password } = req.body as LoginPasswordInterface;

    let findExistsLogin = await UserModel.findOne({ login }, "_id");
    if (findExistsLogin) {
      res.status(400).json({ message: "Login already exists!" });
      return;
    }

    let user = await UserModel.create({ login, password: await hash(password) });

    res.status(201).json(generateToken(user, true, true));
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error!" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    let { error } = LoginPasswordValidation(req.body);
    if (error) {
      res.status(400).json({ message: error.details[0].message });
      return;
    }

    let { login, password } = req.body as LoginPasswordInterface;
    let user = await UserModel.findOne({ login }, select);

    if (!user) {
      res.status(400).json({ message: "Invalid password or login!" });
      return;
    } else if (user.status === "banned") {
      res.status(400).json({ message: "User is banned!" });
      return;
    }

    let isValidPass = await verify(user?.password!, password);
    if (!isValidPass) {
      res.status(400).json({ message: "Invalid password or login!" });
      return;
    }

    res.status(200).json(generateToken(user, true, true));
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error!" });
  }
};

export const regenerateAccessToken = async (req: Request, res: Response) => {
  try {
    let { refreshToken } = req.body as { refreshToken: string };
    if (!refreshToken) {
      res.status(400).json({ message: "Refresh token is required!" });
      return;
    }

    let decode: { _id: string } | null = null;
    try {
      decode = jwtVerify(refreshToken, process.env.REFRESH_SECRET!) as { _id: string };
    } catch (error) {
      res.status(400).json({ message: "Invalid refresh token!" });
      return;
    }

    if (!decode._id) {
      res.status(400).json({ message: "Invalid refresh token!" });
      return;
    }

    let user = await UserModel.findById(decode._id, select);
    if (!user) {
      res.status(404).json({ message: "User not found!" });
      return;
    }

    res.status(200).json(generateToken(user, true, false));
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error!" });
  }
};

export const userVerify = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      res.status(401).json({ message: "Unauthorized!" });
      return;
    }

    let user = await UserModel.findById(
      req.user._id,
      select
    ).lean();
    if (!user) {
      res.status(404).json({ message: "User not found!" });
      return;
    }

    res.status(200).json(generateToken(user, false, false));
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error!" });
  }
};