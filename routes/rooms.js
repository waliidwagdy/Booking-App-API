import express from "express";
import {
  createRoom,
  deleteRoom,
  getRoom,
  getRooms,
  updateRoom,
} from "../controllers/rooms.js";
import { verifyAdmin } from "../middlewares/auth.js";

const router = express.Router();

//Get All
router.get("/", getRooms);
//Get
router.get("/:id", getRoom);
//Create
router.post("/:hotelId", verifyAdmin, createRoom);
//Update
router.put("/:id", verifyAdmin, updateRoom);
//Delete
router.delete("/:id/:hotelId", verifyAdmin, deleteRoom);

export default router;
