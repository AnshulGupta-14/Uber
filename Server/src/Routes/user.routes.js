import { Router } from "express";
const router = Router();
import { body } from "express-validator";
import { getUserProfile, loginUser, registerUser } from "../Controllers/user.controller.js";
import { authUser } from "../Middlewares/auth.middleware.js";

router
  .route("/register") // register
  .post(
    [
      body("fullname").notEmpty().withMessage("Name is required"),
      body("email").isEmail().withMessage("Please enter a valid email"),
      body("password")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters long"),
    ],
    registerUser
  );

router
  .route("/login")
  .post(
    [
      body("email").isEmail().withMessage("Please enter a valid email"),
      body("password")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters long"),
    ],
    loginUser
  );

router.route('/user-profile').get(authUser, getUserProfile);

export default router;
