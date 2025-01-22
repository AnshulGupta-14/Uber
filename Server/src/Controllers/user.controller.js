import { User } from "../Models/user.model.js";
import { validationResult } from "express-validator";

export const registerUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { fullname, email, password } = req.body;
  if (!fullname || !email || !password) {
    throw new Error("All fields must be provided!");
  }

  const existedUser = await User.findOne({email});
  if (existedUser) {
    if (existedUser.email === email.toLowerCase()) {
      throw new Error("User already exists with the same email");
    }
  }

  const user = await User.create({
    fullname,
    email: email.toLowerCase(),
    password,
  });

  const token = user.generateAccessToken();
  res.status(201).json({ user, token });
};

export const loginUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;
  if (!email || !password) {
    throw new Error("Email and password are required!");
  }
  const user = await User.findOne({ email: email.toLowerCase() }).select('+password');
  if (!user || !(await user.isPasswordCorrect(password))) {
    throw new Error("Invalid email or password!");
  }
  const token = user.generateAccessToken();
  res.status(200).json({ user, token });
}
