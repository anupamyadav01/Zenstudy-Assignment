import express from "express";
import { userRoutes } from "./routes/userRoutes.js";

const app = express();
const PORT = 10000;

app.use(express.json());
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/user", userRoutes);

app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
