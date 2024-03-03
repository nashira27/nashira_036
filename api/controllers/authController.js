import User from "../models/userModel.js";
import bcryptjs from "bcryptjs";

export const signup = async (req, res) => {
  const { username, firstname, lastname, email, password } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({
    username,
    firstname,
    lastname,
    email,
    password: hashedPassword,
  });
  console.log(newUser);
  try {
    const addedUser = await newUser.save();
    console.log(addedUser);
    res.status(201).json(addedUser);
  } catch (error) {
    res.status(500).json(error);
  }
};
