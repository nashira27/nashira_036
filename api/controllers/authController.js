import User from "../models/userModel.js";

export const signup = async (req, res) => {
  const { username, firstname, lastname, email, password } = req.body;
  const newUser = new User({ username, firstname, lastname, email, password });
  try {
    await newUser.save();
    res.status(201).json({ message: "User created successfully." });
  } catch (error) {
    res.status(500).json(error);
  }
};
