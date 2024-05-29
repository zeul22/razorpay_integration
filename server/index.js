import express from "express";
import dotenv from "dotenv";
import { dbConnect } from "./db/dbconfig.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import Razorpay from "razorpay";

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
app.use(express.urlencoded({ extended: true }));

export const instance = new Razorpay({
  key_id: `${process.env.KEY_ID}`,
  key_secret: `${process.env.KEY_SECRET}`,
});

dbConnect()
  .then(
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    })
  )
  .catch(console.log(`Error running the server!`));

import router from "./routes/payment.routes.js";
app.use("/api", router);

app.get("/api/verification/getkey", (req, res) =>
  res.status(200).json({ key: process.env.KEY_ID })
);
