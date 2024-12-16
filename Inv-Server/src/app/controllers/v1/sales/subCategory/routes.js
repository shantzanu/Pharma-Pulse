import express from "express";
const app = express();
import { create, getAll, update, deleteById, getById ,MasterData} from "./subCategory.js";
import uploadFile from "../../../../middleware/upload.js";

app.post("/",uploadFile.single('image'), create);
app.get("/", getAll);
app.get("/MasterData", MasterData);
app.put("/:id",uploadFile.single('image'), update);
app.get("/:id", getById);
app.delete("/:id", deleteById);

export default app;
