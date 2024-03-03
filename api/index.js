import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRoutes from "./routes/userRoute.js";

const app = express();
dotenv.config();
app.listen(3000, () => console.log("Server listening on port 3000"));

mongoose
  .connect(process.env.MONGO)
  .then(() => console.log("Connected to db"))
  .catch((err) => console.log(err));

app.use("/api/user", userRoutes);
