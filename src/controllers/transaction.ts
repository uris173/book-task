import { TransactionModel } from "../models/transaction";
import { OrderModel } from "../models/order";

export const getTransactionInfo = async (req: any, res: any) => {
  try {
    let { id } = req.params
    if (!id) {
      res.status(400).json({ message: "Transaction ID is required!" });
      return;
    }

    let transaction = await TransactionModel.findById(id, "status").lean();
    if (!transaction) {
      res.status(404).json({ message: "Transaction not found!" });
      return;
    }

    let order = await OrderModel.findOne({ transaction: id }, "book price")
      .populate({
        path: "book",
        select: "-_id title author"
      })
      .lean();
    
    res.status(200).json({ transaction, order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error!" });
  }
};