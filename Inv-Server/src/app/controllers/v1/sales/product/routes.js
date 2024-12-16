import express from "express";
const app = express();
import { create, getAll, update, deleteById, getById ,MasterData,deleteProductImg,addProductVariant,updateProductVariant} from "./product.js";
import uploadFile from "../../../../middleware/upload.js";

app.post("/",uploadFile.array('images',4), create);
app.get("/", getAll);
app.get("/MasterData", MasterData);
app.put("/:id",uploadFile.array('images',4), update);
app.put("/deleteProductImg/:id", deleteProductImg);
app.put("/addProductVariant/:id", addProductVariant);
app.put("/updateProductVariant/:id", updateProductVariant);
app.get("/:id", getById);
app.delete("/:id", deleteById);

export default app;
