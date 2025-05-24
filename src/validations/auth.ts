import Joi from 'joi';
import { LoginPasswordInterface } from 'interfaces/auth';

export const LoginPasswordValidation = (data: LoginPasswordInterface) => Joi.object({
  login: Joi.string().min(3).max(30).required(),
  password: Joi.string().min(3).max(10).required(),
}).validate(data);