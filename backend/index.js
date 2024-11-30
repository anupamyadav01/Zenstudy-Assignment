import express from "express";
import { userRoutes } from "./routes/userRoutes.js";
import { connectToDB } from "./utils/connectToDB.js";
import { contactRoutes } from "./routes/contactRoutes.js";
import cors from "cors";
const app = express();
const PORT = 10000;

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
connectToDB();

app.use("/api/user", userRoutes);
app.use("/api/contact", contactRoutes);

app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
