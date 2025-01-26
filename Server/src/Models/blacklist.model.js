import mongoose, { Schema } from "mongoose";

const blackListedSchema = new Schema({
  token: {
    type: String,
    required: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    required: true,
    expires: process.env.JWT_EXPIRY,
  },
});

export const blackList = mongoose.model("blackList", blackListedSchema);
