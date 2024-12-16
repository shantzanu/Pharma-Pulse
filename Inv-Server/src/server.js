import express from "express";
import env from "dotenv";
import logger from "morgan";
import cors from "cors";
import mongooseCon from "./configuration/mongoose.js";
import { CONSTANTS, DIR } from "./configuration/config.js";
import apiRouter from "./app/routes.js";
import configExpressJwt from "./configuration/expressJwt.js";
import bodyParser from "body-parser";
import customResponse from "./app/helpers/customResponse.js";
import fs from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import initialInsert from "./app/seeds/seeds.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
env.config();
const app = express();
app.use(cors("*"));
app.use("/v1", configExpressJwt());
mongooseCon(app);
app.use(logger("dev"));
initialInsert();
app.use(bodyParser.json());
app.use(customResponse);
app.use('/images', express.static(join(__dirname, "./assets")));
app.use("/", apiRouter);

app.set("port", CONSTANTS.port || 4500);

app.listen(app.get("port"), () => {
  console.log(`Server Running on PORT ${app.get("port")}`);
});
DIR.forEach((x) => {
  if (!fs.existsSync(x)) {
    fs.mkdirSync(x, { recursive: true });
  }
});
export default app;
