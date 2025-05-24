import { Request, Response } from "express";

import { BookModel } from "../models/book";
import { OrderModel } from "../models/order";
import { TransactionModel } from "../models/transaction";

import { removeSpaceFromCardNum } from "../utils/helper";
import { bookBuyValidation } from "../validations/book";
import { BookByBodyInterface } from "interfaces/book";

export const all = async (req: Request, res: Response) => {
  try {
    let count = await BookModel.countDocuments();
    let books = await BookModel.find({ }, "-__v -updatedAt")
      .sort({ _id: -1 })
      .lean();

    res.status(200).json({ count, books });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error!" });
  }
};

export const buyBook = async (req: Request, res: Response) => {
  try {
    let { error } = bookBuyValidation(req.body);
    if (error) {
      res.status(400).json({ message: error.details[0].message });
      return;
    }
    
    let { _id } = req.user!;
    let { bookId, cardNumber } = req.body as BookByBodyInterface;

    let book = await BookModel.findById(bookId, "-_id price");
    if (!book) {
      res.status(404).json({ message: "Book not found!" });
      return;
    }

    let transaction = await TransactionModel.create({ user: _id, book: bookId, cardNumber });
    res.status(201).json({ message: "The transaction is in progress...", transaction: transaction._id });
    
    setTimeout(async () => {
      const isValidCard = removeSpaceFromCardNum(cardNumber);
      if (!isValidCard) {
        await TransactionModel.findByIdAndUpdate(transaction._id, { status: "failed" });
        return;
      }

      await TransactionModel.findByIdAndUpdate(transaction._id, { status: "completed" });
      await OrderModel.create({ user: _id, book: bookId, cardNumber, price: book.price, transaction: transaction._id });
    }, 1000);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error!" });
  }
};