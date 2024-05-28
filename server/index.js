import express from "express";
import dotenv from "dotenv";
import { dbConnect } from "./db/dbconfig.js";
import cookieParser from "cookie-parser";
import cors from "cors";
dotenv.config({
  path: "./.env",
});

const app = express();

app.use(cookieParser());
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());

dbConnect().then(
  app.listen(process.env.PORT, (req, res) => {
    console.log(`Server is running on port ${process.env.PORT}`);
  })
);
