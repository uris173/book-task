import { Request, Response } from "express";
import { OrderModel } from "../models/order";
import { TransactionModel } from "../models/transaction";
import { UserModel } from "../models/user";

export const getStatistic = async (req: Request, res: Response) => {
  try {
    let [activeUser, bannsedUsers] = await Promise.all([
      await UserModel.countDocuments({ status: "active" }),
      await UserModel.countDocuments({ status: "banned" })
    ]);

    let [pending, completed, failed] = await Promise.all([
      TransactionModel.countDocuments({ status: "pending" }),
      TransactionModel.countDocuments({ status: "completed" }),
      TransactionModel.countDocuments({ status: "failed" })
    ]);

    let orders = await OrderModel.countDocuments();

    res.status(200).json({
      users: { activeUser, bannsedUsers },
      transactions: { pending, completed, failed },
      orders
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error!" });
  }
};

export const banUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) {
      res.status(400).json({ message: "User ID is required!" });
      return;
    }

    const user = await UserModel.findByIdAndUpdate(id, { status: "banned" }, { new: true, select: "_id" });
    if (!user) {
      res.status(404).json({ message: "User not found!" });
      return;
    }

    res.status(200).json({ message: "User banned!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error!" });
  }
};