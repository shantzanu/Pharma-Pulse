import express from "express";

const router = express.Router();

import authRouter from "./auth/index.js";
import salesRouter from "./sales/index.js";
import webRouter from "./web/index.js";


router.use("/auth", authRouter);
router.use("/sales", salesRouter);
router.use("/web", webRouter);


export default router;
