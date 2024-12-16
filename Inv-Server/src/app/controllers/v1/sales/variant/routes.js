import express from "express";
const app = express();

import { create, getAll, update, deleteById, getById } from "./variant.js";

app.post("/", create);
app.get("/", getAll);
app.get("/:id", getById);
app.put("/:id", update);
app.delete("/:id", deleteById);

export default app;
