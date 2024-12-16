import express from "express";
const app = express();
import { create, getAll, update, deleteById, getById} from "./homeVisual.js";
import uploadFile from "../../../../middleware/upload.js";

app.post("/",uploadFile.single('image'), create);
app.get("/", getAll); 
app.put("/:id",uploadFile.single('image'), update);
app.get("/:id", getById);
app.delete("/:id", deleteById);

export default app;
