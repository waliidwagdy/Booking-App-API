import express from "express";
import {
  countByCity,
  countByType,
  createHotel,
  deleteHotel,
  getHotel,
  getHotels,
  updateHotel,
} from "../controllers/hotels.js";
import { verifyAdmin } from "../middlewares/auth.js";

const router = express.Router();

//Get All
router.get("/", getHotels);
//Get
router.get("/findOne/:id", getHotel);
//Create
router.post("/", verifyAdmin, createHotel);
//Update
router.put("/:id", verifyAdmin, updateHotel);
//Delete
router.delete("/:id", verifyAdmin, deleteHotel);

router.get("/countByCity", countByCity);
router.get("/countByType", countByType);

export default router;
