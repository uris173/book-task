import Joi from "joi";
import { BookByBodyInterface } from "interfaces/book";

export const bookBuyValidation = (data: BookByBodyInterface) => Joi.object({
  bookId: Joi.string().required(),
  cardNumber: Joi.string().length(16).required(),
}).validate(data);