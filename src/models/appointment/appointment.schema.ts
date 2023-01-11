import mongoose, { Schema } from "mongoose";

const AppointmentSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  visitDate: {
    type: Date,
    required: true,
  },
  created: {
    type: Date,
    default: Date.now,
  },
  client:
  {
    type: mongoose.Types.ObjectId,
    ref: "user",
  },
  partner: {
    type: mongoose.Types.ObjectId,
    ref: "user",
  },
});

export default AppointmentSchema;