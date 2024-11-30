import { UserModel } from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  const imgURL = req.secure_url;
  try {
    console.log(req.body);

    if (!name || !email || !password) {
      return res.status(400).send({ message: "All fields are required" });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }
    const existingUser = await UserModel.findOne({ email: email });
    if (existingUser) {
      return res.status(409).send({
        message: "User Already registered with this email",
      });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const userData = {
      name,
      email,
      password: hashedPassword,
      image: imgURL || "",
    };

    const newUser = await UserModel.create(userData);

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.log("Error in register user", error);
    res.status(500).json({ error: "Unable to register user, try again." });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    // validate email
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    const user = await UserModel.findOne({ email: email });
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.cookie("token", token, {
      path: "/",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
    });

    res.status(200).json({ message: "User logged in successfully", user });
  } catch (error) {
    console.log("Error in login user", error);
    res.status(500).json({ error: "Unable to login user, try again." });
  }
};

export const logoutUser = async (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    console.log("Error in logout user", error);
    res.status(500).json({ error: "Unable to logout user, try again." });
  }
};
export const getLoggedInUser = async (req, res) => {
  const user = req.user;
  try {
    const data = await UserModel.findById(user?._id);
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }
    res.status(200).json({ user });
  } catch (error) {
    console.log("Error in get logged in user", error);
    res.status(500).json({ error: "Unable to get logged in user, try again." });
  }
};
