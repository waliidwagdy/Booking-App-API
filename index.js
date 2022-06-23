import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import { errorHandler } from "./middlewares/error.js";
import authRoutes from "./routes/auth.js";
import hotelsRoutes from "./routes/hotels.js";
import usersRoutes from "./routes/users.js";
import roomsRoutes from "./routes/rooms.js";

dotenv.config();
const app = express();

//middlewares
app.use(cookieParser());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/hotels", hotelsRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/rooms", roomsRoutes);
app.use(errorHandler);
mongoose.connection.on("connected", () => {
  console.log("connected to DB");
});
mongoose.connection.on("disconnected", () => {
  console.log("disconnected from DB");
});
(async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    app.listen(8800, () => {
      console.log("Connected to port:8800");
    });
  } catch (error) {
    throw error;
  }
})();
