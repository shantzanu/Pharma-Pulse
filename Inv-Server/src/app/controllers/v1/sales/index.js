import express from "express";
const router = express.Router();

import product from "./product/routes.js";
import category from "./category/routes.js";
import subCategory from "./subCategory/routes.js";
import variant from "./variant/routes.js";
import cart from "./cart/routes.js";
import homeVisual from "./homeVisual/routes.js";






router.use("/product", product);
router.use("/category", category);
router.use("/subCategory", subCategory);
router.use("/variant", variant);
router.use("/cart", cart);
router.use("/homeVisual", homeVisual);






export default router;
