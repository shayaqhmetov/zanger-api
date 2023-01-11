import { Schema } from "mongoose";

const NotificationSchema = new Schema({
  time: {
    type: Date,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
});

export default NotificationSchema;