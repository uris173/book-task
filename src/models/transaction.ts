import { Schema, Types, model } from "mongoose";

const transactionSchema = new Schema({
  user: {
    type: Types.ObjectId,
    ref: "user",
    required: true,
  },
  book: {
    type: Types.ObjectId,
    ref: "book",
    required: true,
  },
  cardNumber: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "completed", "failed"],
    default: "pending",
  }
}, { timestamps: true });

transactionSchema.index({ user: 1 });
transactionSchema.index({ book: 1 });
transactionSchema.index({ status: 1 });

export const TransactionModel = model("transaction", transactionSchema);