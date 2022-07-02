import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { createError } from "../utils/error.js";

const salt = bcrypt.genSaltSync(10);
export const register = async (req, res, next) => {
  try {
    const hash = bcrypt.hashSync(req.body.password, salt);
    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: hash,
    });
    await user.save();
    res.status(201).json("User has been created");
  } catch (e) {
    next(e);
  }
};
export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return next(createError(404, "User not found."));
    const isCorrect = await bcrypt.compare(req.body.password, user.password);
    if (!isCorrect) return next(createError(401, "Invalid credentials."));
    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET
    );
    const { password, isAdmin, ...rest } = user._doc;
    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(201)
      .json(rest);
  } catch (e) {
    next(e);
  }
};
