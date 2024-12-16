import express from "express";
const router = express.Router();

import product from "./product/routes.js";
import category from "./category/routes.js";
import purchaseBill from "./purchaseBill/routes.js";
import item from "./item/routes.js";
import cart from "./cart/routes.js";
import homeVisual from "./homeVisual/routes.js";






router.use("/invoice", product);
router.use("/category", category);
router.use("/purchaseBill", purchaseBill);
router.use("/item", item);
router.use("/cart", cart);
router.use("/homeVisual", homeVisual);






export default router;
