import express from "express";
import { userRoutes } from "./routes/userRoutes.js";
import { connectToDB } from "./utils/connectToDB.js";

const app = express();
const PORT = 10000;

app.use(express.json());

connectToDB();

app.use("/api/user", userRoutes);

app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
