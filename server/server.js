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

// route for register a new user
app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  // Await the bcrypt hash result
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    res.json(newUser);
  } catch (e) {
    res.status(400).json(e);
  }
});

// route for login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  // find the user with the email
  const matchedUser = await User.findOne({ email });
  if (matchedUser) {
    // compare the input password with the database stored password
    const validPassword = bcrypt.compareSync(password, matchedUser.password);
    if (validPassword) {
      res.json("Login successful");
    } else {
      res.status(422).json("Wrong password");
    }
  } else {
    res.status(404).json("User not found");
  }
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
