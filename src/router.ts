import { Router } from "express";
const router = Router();

import AuthRoter from "./routers/auth";
import BookRouter from "./routers/book";
import TransactionRouter from "./routers/transaction";
import AdminRouter from "./routers/admin";

router.use("/auth", AuthRoter);
router.use("/books", BookRouter);
router.use("/transactions", TransactionRouter);
router.use("/admin", AdminRouter);


export default router;