// Booking schema
import mongoose from "mongoose";
const { Schema } = mongoose;

const BookingSchema = new Schema({
  place: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Place" },
  user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
  checkIn: { type: Date, required: true },
  checkOut: { type: Date, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  numberOfGuests: { type: Number, required: true },
  price: Number,
});

const BookingModel = mongoose.model("Booking", BookingSchema);

export default BookingModel;
