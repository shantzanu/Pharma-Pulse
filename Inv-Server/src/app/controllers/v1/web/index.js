import express from "express";
const router = express.Router();

import home from "./home/routes.js"; 






router.use("/home", home); 






export default router;
