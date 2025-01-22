import { User } from "../Models/user.model.js";
import jwt from "jsonwebtoken";

export const authUser = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization.split(" ")[1];
  
  if (!token) {
    return res.status(401).json({ msg: "Not authorized, token is required" });
  }

  try {
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    let user = await User.findOne({_id: decoded._id});    
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};
