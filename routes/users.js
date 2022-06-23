import express from "express";
import {
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} from "../controllers/users.js";
import { verifyAdmin, verifyUser } from "../middlewares/auth.js";

const router = express.Router();

//Get All
router.get("/", verifyAdmin, getUsers);
//Get
router.get("/:id", verifyUser, getUser);
//Update
router.put("/:id", verifyUser, updateUser);
//Delete
router.delete("/:id", verifyUser, deleteUser);

export default router;
