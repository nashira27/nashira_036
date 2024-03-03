import User from "../models/userModel.js";
import bcryptjs from "bcryptjs";

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
