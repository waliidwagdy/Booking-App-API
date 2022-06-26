import Hotel from "../models/Hotel.js";

export const createHotel = async (req, res, next) => {
  try {
    const newHotel = new Hotel(req.body);
    const savedHotel = await newHotel.save();
    res.status(201).json(savedHotel);
  } catch (err) {
    next(err);
  }
};
export const getHotels = async (req, res, next) => {
  try {
    const { min, max, ...others } = req.query;
    const hotels = await Hotel.find({
      others,
      cheapestPrice: {
        $gt: min || 1,
        $lte: max || 999,
      },
    }).limit(req.query.limit);
    res.status(200).json(hotels);
  } catch (err) {
    next(err);
  }
};
export const getHotel = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    res.status(200).json(hotel);
  } catch (err) {
    next(err);
  }
};
export const updateHotel = async (req, res, next) => {
  try {
    const updatedHotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(204).json(updatedHotel);
  } catch (err) {
    next(err);
  }
};
export const deleteHotel = async (req, res, next) => {
  try {
    await Hotel.findByIdAndDelete(req.params.id);
    res.status(204).json("Hotel has been deleted");
  } catch (err) {
    next(err);
  }
};
export const countByCity = async (req, res, next) => {
  try {
    const cities = req.query.cities.split(",");
    const list = await Promise.all(
      cities.map((city) => {
        return Hotel.countDocuments({ city });
      })
    );
    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};
export const countByType = async (req, res, next) => {
  try {
    const [hotelCount, apartmentCount, resortCount, villaCount, cabinCount] =
      await Promise.all([
        Hotel.countDocuments({ type: "hotel" }),
        Hotel.countDocuments({ type: "apartment" }),
        Hotel.countDocuments({ type: "resort" }),
        Hotel.countDocuments({ type: "villa" }),
        Hotel.countDocuments({ type: "cabin" }),
      ]);
    res.status(200).json([
      { type: "hotel", count: hotelCount },
      { type: "apartment", count: apartmentCount },
      { type: "resort", count: resortCount },
      { type: "villa", count: villaCount },
      { type: "cabin", count: cabinCount },
    ]);
  } catch (err) {
    next(err);
  }
};
