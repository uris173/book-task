import { Router } from "express";
import passport from "../middleware/passport";
import { user } from "../middleware/role";
const router = Router();

import {
  all,
  buyBook
} from "../controllers/books";

router.get("/", passport.authenticate("jwt", { session: false }), user, all);
router.post("/buy", passport.authenticate("jwt", { session: false }), user, buyBook);


export default router;

/**
 * @swagger
 * tags:
 *   - name: Books
 *     description: API для работы с books
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Book:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: ID книги
 *         title:
 *           type: string
 *           description: Название книги
 *         author:
 *           type: string
 *           description: Автор книги
 *         description:
 *           type: string
 *           description: Описание книги
 *         price:
 *           type: number
 *           description: Цена книги
 *         photo:
 *           type: string
 *           description: URL фотографии обложки книги
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Дата создания записи
 *     BookPurchaseRequest:
 *       type: object
 *       required:
 *         - bookId
 *         - cardNumber
 *       properties:
 *         bookId:
 *           type: string
 *           description: ID книги для покупки
 *           example: 60d21b4667d0d8992e610c85
 *         cardNumber:
 *           type: string
 *           description: Номер карты для оплаты
 *           example: "1234567890123456"
 *     TransactionResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: Сообщение о статусе транзакции
 *         transaction:
 *           type: string
 *           description: ID созданной транзакции
 */

/**
 * @swagger
 * /books:
 *   get:
 *     summary: Получение всех книг
 *     description: Возвращает список всех доступных книг
 *     tags:
 *       - Books
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Список книг успешно получен
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 count:
 *                   type: integer
 *                   description: Количество книг
 *                 books:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Book'
 *       401:
 *         description: Неавторизован
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

/**
 * @swagger
 * /books/buy:
 *   post:
 *     summary: Покупка книги
 *     description: Создает транзакцию для покупки книги и обрабатывает платеж
 *     tags:
 *       - Books
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BookPurchaseRequest'
 *     responses:
 *       201:
 *         description: Транзакция успешно создана
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TransactionResponse'
 *       400:
 *         description: Ошибка валидации
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MessageResponse'
 *       404:
 *         description: Книга не найдена
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