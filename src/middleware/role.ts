import { Request, Response, NextFunction } from "express";

export const admin = (req: Request, res: Response, next: NextFunction) => {
  if (req.user) {
    let { role } = req.user;
    if (role === "admin") {
      return next();
    }

    res.status(403).json({ message: "Access denied!" });
    return;
  }

  res.status(401).json({ message: "Auth error!" });
  return;
};

export const user = (req: Request, res: Response, next: NextFunction) => {
  if (req.user) {
    let { role, status } = req.user;
    if (status === "banned") {
      res.status(403).json({ message: "Your account iss banned!" });
      return;
    }

    if (role === "user") {
      return next();
    }

    res.status(403).json({ message: "Access denied!" });
    return
  }

  res.status(401).json({ message: "Auth error!" });
  return;
};