import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [/\S+@\S+\.\S+/, "Invalid email address"],
    },
    password: {
      type: String,
      required: [true, "Password field is required"],
      minlength: [6, "Password field must be at least 6 characters"],
    },
    fullname: {
      type: String,
      required: true,
      trim: true,
      match: [
        /^[a-zA-Z\s]+$/,
        "Full name must contain only letters and spaces",
      ],
      index: true,
    },
    socketId: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
  // console.log(this);
  // console.log(password);
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRY,
    }
  );
};

export const User = mongoose.model("User", userSchema);
