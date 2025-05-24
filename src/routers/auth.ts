import { Router } from "express";
import passport from "../middleware/passport";
const router = Router();

import {
  createAdmin,
  login,
  registration,
  regenerateAccessToken,
  userVerify
} from "../controllers/auth";

router.post("/create-admin", createAdmin);
router.post("/login", login);
router.post("/registration", registration);
router.post("/regenerate-access-token", regenerateAccessToken);
router.get("/verify", passport.authenticate("jwt", { session: false }), userVerify);


export default router;

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     LoginPassword:
 *       type: object
 *       required:
 *         - login
 *         - password
 *       properties:
 *         login:
 *           type: string
 *           minLength: 3
 *           maxLength: 30
 *           description: Логин пользователя
 *           example: admin
 *         password:
 *           type: string
 *           minLength: 3
 *           maxLength: 10
 *           description: Пароль пользователя
 *           example: secret123
 *     MessageResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: Сообщение ответа
 *     TokenResponse:
 *       type: object
 *       properties:
 *         accessToken:
 *           type: string
 *           description: JWT токен доступа
 *         expiresIn:
 *           type: integer
 *           description: Время жизни токена в секундах
 *         refreshToken:
 *           type: string
 *           description: JWT refresh токен
 *         user:
 *           type: object
 *           properties:
 *             _id:
 *               type: string
 *               description: ID пользователя
 *             login:
 *               type: string
 *               description: Логин пользователя
 *             role:
 *               type: string
 *               description: Роль пользователя
 */

/**
 * @swagger
 * /auth/create-admin:
 *   post:
 *     summary: Создать администратора
 *     description: Создаёт нового администратора. Можно вызвать только один раз.
 *     tags:
 *       - Авторизация
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginPassword'
 *     responses:
 *       201:
 *         description: Администратор успешно создан
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MessageResponse'
 *       400:
 *         description: Ошибка валидации или администратор уже существует
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
 * /auth/login:
 *   post:
 *     summary: Вход пользователя
 *     description: Вход по логину и паролю. Возвращает JWT токены.
 *     tags:
 *       - Авторизация
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginPassword'
 *     responses:
 *       200:
 *         description: Успешный вход
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TokenResponse'
 *       400:
 *         description: Ошибка валидации, неверный логин или пароль, пользователь заблокирован
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
 * /auth/registration:
 *   post:
 *     summary: Регистрация пользователя
 *     description: Регистрирует нового пользователя и возвращает JWT токены.
 *     tags:
 *       - Авторизация
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginPassword'
 *     responses:
 *       201:
 *         description: Пользователь успешно зарегистрирован
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TokenResponse'
 *       400:
 *         description: Ошибка валидации или логин уже существует
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
 * /auth/regenerate-access-token:
 *   post:
 *     summary: Обновить access токен по refresh токену
 *     description: Возвращает новый access токен по действующему refresh токену.
 *     tags:
 *       - Авторизация
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - refreshToken
 *             properties:
 *               refreshToken:
 *                 type: string
 *                 description: Refresh токен пользователя
 *                 example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *     responses:
 *       200:
 *         description: Новый access токен успешно сгенерирован
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TokenResponse'
 *       400:
 *         description: Ошибка валидации или refresh токен недействителен
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
 *       500:
 *         description: Внутренняя ошибка сервера
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MessageResponse'
 */

/**
 * @swagger
 * /auth/verify:
 *   get:
 *     summary: Проверить авторизацию пользователя
 *     description: Проверяет JWT токен пользователя и возвращает информацию о пользователе.
 *     tags:
 *       - Авторизация
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Пользователь авторизован
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TokenResponse'
 *       401:
 *         description: Неавторизован
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
 *       500:
 *         description: Внутренняя ошибка сервера
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MessageResponse'
 */