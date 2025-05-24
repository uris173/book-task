import { Router } from "express";
import passport from "../middleware/passport";
import { user } from "../middleware/role";
const router = Router();

import {
  getTransactionInfo
} from "../controllers/transaction";

router.get("/:id", passport.authenticate("jwt", { session: false }), user, getTransactionInfo);

export default router;

/**
 * @swagger
 * tags:
 *   - name: Transaction
 *     description: API для работы с transaction
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Transaction:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: ID транзакции
 *         user:
 *           type: string
 *           description: ID пользователя, совершившего транзакцию
 *         book:
 *           type: string
 *           description: ID книги, которая была приобретена
 *         cardNumber:
 *           type: string
 *           description: Номер карты, использованной для оплаты
 *         status:
 *           type: string
 *           enum: [pending, completed, failed]
 *           description: Статус транзакции
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Дата создания транзакции
 *     TransactionStatusResponse:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *           enum: [pending, completed, failed]
 *           description: Статус транзакции
 *     BookInfo:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           description: Название книги
 *         author:
 *           type: string
 *           description: Автор книги
 *     Order:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: ID заказа
 *         book:
 *           $ref: '#/components/schemas/BookInfo'
 *         price:
 *           type: number
 *           description: Цена покупки
 *     TransactionInfoResponse:
 *       type: object
 *       properties:
 *         transaction:
 *           $ref: '#/components/schemas/TransactionStatusResponse'
 *         order:
 *           $ref: '#/components/schemas/Order'
 *           nullable: true
 */

/**
 * @swagger
 * /transactions/{id}:
 *   get:
 *     summary: Получение информации о транзакции
 *     description: Возвращает данные о транзакции и связанном с ней заказе
 *     tags:
 *       - Transaction
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID транзакции
 *     responses:
 *       200:
 *         description: Информация о транзакции успешно получена
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TransactionInfoResponse'
 *       400:
 *         description: Отсутствует ID транзакции
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MessageResponse'
 *       404:
 *         description: Транзакция не найдена
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MessageResponse'
 *       500:
 *         description: Внутренняя ошибка сервера
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MessageResponse'
 */