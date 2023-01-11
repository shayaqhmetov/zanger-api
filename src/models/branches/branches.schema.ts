import mongoose, { Schema } from "mongoose";

const BranchSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  created: {
    type: Date,
    default: Date.now,
  },
  users: {
    type: [
      {
        type: mongoose.Types.ObjectId,
        ref: "user",
      },
    ],
  },
});

export default BranchSchema;