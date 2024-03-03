import User from "../models/userModel.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  const { username, firstname, lastname, email, password } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({
    username,
    firstname,
    lastname,
    email,
    password: hashedPassword,
  });
  try {
    const addedUser = await newUser.save();
    res.status(201).json(addedUser);
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  const validUser = await User.findOne({ email });
  if (!validUser) return next(errorHandler(404, "User not found"));

  const validPassword = bcryptjs.compareSync(password, validUser.password);
  if (!validPassword) return next(errorHandler(401, "Invalid credentials"));

  try {
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    const { password: hashedPassword, ...rest } = validUser._doc;

    const expiryDate = new Date(Date.now() + 360000);
    res
      .cookie("access_token", token, {
        httpOnly: true,
        expires: expiryDate,
      })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};
