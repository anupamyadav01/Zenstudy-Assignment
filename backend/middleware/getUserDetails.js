import jwt from "jsonwebtoken";
import { UserModel } from "../models/userModel.js";

export const getUserDetails = async (req, res, next) => {
  try {
    let token = req.headers.cookie.split("=")[1];
    if (!token) {
      token = req.headers.authorization.split(" ")[1];
      if (!token) {
        return res.status(401).json({ message: "Unauthorized Access!!" });
      }
    }

    const details = jwt.verify(token, process.env.JWT_SECRET);

    const user = await UserModel.findById(details.userId);
    if (!user) {
      return res.status(401).json({ message: "Unauthorized Access!!" });
    }
    req.user = user;
    next();
  } catch (error) {
    console.log("Error getting user details", error);
    res.status(500).json({ error: "Failed to get user details" });
  }
};
