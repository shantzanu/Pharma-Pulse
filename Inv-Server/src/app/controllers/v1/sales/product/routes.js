import express from "express";
const app = express();
import { create, getAll, update, deleteById, getById ,MasterData} from "./product.js";

app.post("/", create);
app.get("/", getAll);
app.get("/MasterData", MasterData);
app.put("/:id", update);
app.get("/:id", getById);
app.delete("/:id", deleteById);

export default app;
