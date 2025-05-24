import { Router } from "express";
import passport from "../middleware/passport";
import { admin } from "../middleware/role";
const router = Router();

import { getStatistic, banUser } from "../controllers/admin";

router.get("/statistic", passport.authenticate("jwt", { session: false }), admin, getStatistic);
router.get("/ban-user/:id", passport.authenticate("jwt", { session: false }), admin, banUser);

export default router;

/**
 * @swagger
 * tags:
 *   - name: Admin
 *     description: API для работы с функциями администратора
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     UsersStatistic:
 *       type: object
 *       properties:
 *         activeUser:
 *           type: integer
 *           description: Количество активных пользователей
 *         bannsedUsers:
 *           type: integer
 *           description: Количество заблокированных пользователей
 *     TransactionsStatistic:
 *       type: object
 *       properties:
 *         pending:
 *           type: integer
 *           description: Количество ожидающих транзакций
 *         completed:
 *           type: integer
 *           description: Количество завершенных транзакций
 *         failed:
 *           type: integer
 *           description: Количество неудачных транзакций
 *     StatisticResponse:
 *       type: object
 *       properties:
 *         users:
 *           $ref: '#/components/schemas/UsersStatistic'
 *         transactions:
 *           $ref: '#/components/schemas/TransactionsStatistic'
 *         orders:
 *           type: integer
 *           description: Общее количество заказов
 */

/**
 * @swagger
 * /admin/statistic:
 *   get:
 *     summary: Получение общей статистики
 *     description: Возвращает статистику по пользователям, транзакциям и заказам
 *     tags:
 *       - Admin
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Статистика успешно получена
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/StatisticResponse'
 *       401:
 *         description: Неавторизован или недостаточно прав
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
 * /admin/ban-user/{id}:
 *   get:
 *     summary: Блокировка пользователя
 *     description: Блокирует пользователя по указанному ID
 *     tags:
 *       - Admin
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID пользователя для блокировки
 *     responses:
 *       200:
 *         description: Пользователь успешно заблокирован
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MessageResponse'
 *       400:
 *         description: Отсутствует ID пользователя
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MessageResponse'
 *       404:
 *         description: Пользователь не найден
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MessageResponse'
 *       401:
 *         description: Неавторизован или недостаточно прав
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