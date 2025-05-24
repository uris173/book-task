import { Schema, Types, model } from "mongoose";

const orderSchema = new Schema({
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
  transaction: {
    type: Types.ObjectId,
    ref: "transaction",
    required: true,
  },
  price: Number,
  cardNumber: {
    type: String,
    required: true,
  }
}, { timestamps: true });

orderSchema.index({ user: 1 });
orderSchema.index({ book: 1 });

export const OrderModel = model("order", orderSchema);