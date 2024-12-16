import express from "express";
const app = express();
import { create, getAll, update, deleteById, getById ,MasterData} from "./purchaseBill.js";
import uploadFile from "../../../../middleware/upload.js";

app.post("/", create);
app.get("/", getAll);
app.get("/MasterData", MasterData);
app.put("/:id", update);
app.get("/:id", getById);
app.delete("/:id", deleteById);

export default app;
