import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/User.js";
import bcrypt from "bcrypt";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URL);

app.get("/", (req, res) => {
  res.json({ message: "Hola from the backend server" });
});

app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const newUser = await User.create({
      name,
      email,
      password: bcrypt.hash(password, 10),
    });
    res.json(newUser);
  } catch (e) {
    res.status(400).json(e);
  }
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
