import express from "express";
const app = express();

import { getAllMasterData } from "./home.js";

// app.post("/", create);
app.get("/getAllMasterData", getAllMasterData);
// app.get("/:id", getById);
// app.put("/:id", update);
// app.delete("/:id", deleteById);

export default app;
