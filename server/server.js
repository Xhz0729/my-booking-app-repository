import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);
app.use(express.json());

const jwtSecret = process.env.JWT_SECRET;

mongoose.connect(process.env.MONGO_URL);

// Route for register a new user
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

// POST route for user login
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Search for the user in the database by their email
    const matchedUser = await User.findOne({ email });

    // If no user is found with the provided email, respond with a 404 status and error message
    if (!matchedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    // Compare the provided password with the stored hashed password
    const validPassword = await bcrypt.compare(password, matchedUser.password);

    // If the password is incorrect, respond with a 422 status and an error message
    if (!validPassword) {
      return res.status(422).json({ error: "Wrong password" });
    }

    // If the password is valid, sign a JWT token and send it back as a cookie
    jwt.sign(
      { email: matchedUser.email, id: matchedUser._id }, // Payload with user info
      jwtSecret, // Secret key for signing the token
      { expiresIn: "1h" }, // Token expiration time
      (err, token) => {
        if (err) {
          console.error("Token generation error:", err);
          return res.status(500).json({ error: "Token generation failed" });
        }

        // Return the user information in the response
        res.cookie("token", token).json({ user: matchedUser });
      }
    );
  } catch (error) {
    // Log and handle potential server errors (e.g., database errors)
    console.error("Login error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
