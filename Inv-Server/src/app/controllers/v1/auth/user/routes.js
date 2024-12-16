import express from "express";
const app = express();
import { create, login, getAll, update, deleteById, getById } from "./user.js";

app.post("/login", login);
app.post("/register", create);
app.get("/", getAll);
app.get("/:id", getById);
app.put("/:id", update);
app.delete("/:id", deleteById);

export default app;
    