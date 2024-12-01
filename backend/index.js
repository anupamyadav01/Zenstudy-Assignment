import express from "express";
import { userRoutes } from "./routes/userRoutes.js";
import { connectToDB } from "./utils/connectToDB.js";
import { contactRoutes } from "./routes/contactRoutes.js";
import cors from "cors";

const app = express();
const PORT = 10000;

app.use(express.json({ limit: "50mb" }));

app.use(
  cors({
    origin: ["http://localhost:5173", "https://zenstudy-assignment.vercel.app"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Connect to the database
connectToDB();

app.use("/api/user", userRoutes);
app.use("/api/contact", contactRoutes);

app.use((err, req, res, next) => {
  console.error("Error: ", err.message || "An error occurred"); // Log error details for debugging
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
