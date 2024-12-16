import express from "express";

const router = express.Router();

import user from "./user/routes.js";
import autoIncrement from "./autoIncrement/routes.js";

router.use("/user", user);
router.use("/autoIncrement", autoIncrement);

export default router;
