import Room from "../models/Room.js";
import Hotel from "../models/Hotel.js";

export const createRoom = async (req, res, next) => {
  try {
    const hotelId = req.params.hotelId;
    const newRoom = new Room(req.body);
    const savedRoom = await newRoom.save();
    await Hotel.findByIdAndUpdate(hotelId, { $push: { rooms: savedRoom._id } });
    res.status(201).json(savedRoom);
  } catch (e) {
    next(e);
  }
};
export const getRooms = async (req, res, next) => {
  try {
    const rooms = await Room.find();
    res.status(200).json(rooms);
  } catch (err) {
    next(err);
  }
};
export const getRoom = async (req, res, next) => {
  try {
    const room = await Room.findById(req.params.id);
    res.status(200).json(room);
  } catch (err) {
    next(err);
  }
};
export const updateRoom = async (req, res, next) => {
  try {
    const updatedRoom = await Room.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(204).json(updatedRoom);
  } catch (err) {
    next(err);
  }
};
export const deleteRoom = async (req, res, next) => {
  try {
    const hotelId = req.params.hotelId;
    await Hotel.findByIdAndUpdate(hotelId, { $pull: { rooms: req.params.id } });
    await Room.findByIdAndDelete(req.params.id);
    res.status(204).json("Room has been deleted");
  } catch (err) {
    next(err);
  }
};
