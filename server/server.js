import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/User.js";
import Place from "./models/Place.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import imageDownloader from "image-downloader";
import multer from "multer";
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname } from "path";
export const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);

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
app.use("/uploads", express.static(__dirname + "/uploads"));

// Use the cookieParser middleware to parse cookies
app.use(cookieParser());

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

// GET route to retrieve the user profile based on the token in the cookies
app.get("/profile", (req, res) => {
  const { token } = req.cookies;
  // Check if the token exists
  if (token) {
    // Verify the token using the jwtSecret to decode the user data
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      // Error handling
      if (err) {
        // Respond with an error status and message if token verification fails
        return res.status(403).json({ error: "Invalid token" });
      }
      // Fetch the user details from the database using the user ID from the token payload
      const { name, email, _id } = await User.findById(userData.id);
      // Respond with the user's name, email, and ID as JSON
      res.json({ name, email, _id });
    });
  } else {
    // If no token is found, respond with null to indicate no user is logged in
    res.json(null);
  }
});

// Post route to logout
app.post("/logout", (req, res) => {
  res.cookie("token", "").json(true);
});

// POST route to upload by URL
app.post("/upload-by-url", async (req, res) => {
  const { link } = req.body;
  const newName = Date.now() + ".jpg"; // Generate a new filename

  try {
    // Use async/await to ensure the image download completes before sending a response
    await imageDownloader.image({
      url: link,
      dest: __dirname + "/uploads/" + newName,
    });

    // Respond with the new filename after the image has been successfully downloaded
    res.json(newName);
  } catch (error) {
    console.error("Error downloading image:", error);
    res.status(500).json({ error: "Failed to download image" }); // Respond with error message if download fails
  }
});

// Middleware to handle file uploads
// setting the destination folder to 'uploads/'
const photosMidWare = multer({ dest: "uploads/" });

// Post route to handle photo uploads
app.post("/upload", photosMidWare.array("photos", 100), (req, res) => {
  const uploadedFiles = [];

  // Loop through each uploaded file
  for (let i = 0; i < req.files.length; i++) {
    // Extract file path and original name
    const { path, originalname } = req.files[i];
    // Split the original file name to get the extension and get the new filename
    const parts = originalname.split(".");
    const extension = parts[parts.length - 1];
    const newPath = path + "." + extension;
    // Rename the file to include the correct extension
    fs.renameSync(path, newPath);
    // Add the new file path to the array, removing 'uploads/' prefix
    uploadedFiles.push(newPath.replace("uploads/", " "));
  }

  // Send the list of uploaded file paths back as the response
  res.json(uploadedFiles);
});

// POST route to create a new place
app.post("/places", (req, res) => {
  // grab user id from the token
  const { token } = req.cookies;

  const {
    title,
    address,
    photos,
    description,
    amenities,
    extraInfo,
    checkIn,
    checkOut,
    maxGuests,
  } = req.body;

  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    // Error handling
    if (err) {
      // Respond with an error status and message if token verification fails
      return res.status(403).json({ error: "Invalid token" });
    }
    const newPlace = await Place.create({
      owner: userData.id,
      title,
      address,
      photos,
      description,
      amenities,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
    });
    res.json(newPlace);
  });
});

// Get route to retrieve all places related to the user by user id
app.get("/places", (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    // Error handling
    if (err) {
      // Respond with an error status and message if token verification fails
      return res.status(403).json({ error: "Invalid token" });
    }
    // Retrieve all places that belong to the user
    const { id } = userData;
    const places = await Place.find({ owner: id });
    res.json(places);
  });
});

// Get route to retrieve a single place by id
app.get("/places/:id", async (req, res) => {
  const { id } = req.params;
  res.json(await Place.findById(id));
});

// Put route to update a place by id
app.put("/places", async (req, res) => {
  const { token } = req.cookies;
  const {
    id,
    title,
    address,
    photos,
    description,
    amenities,
    extraInfo,
    checkIn,
    checkOut,
    maxGuests,
  } = req.body;

  // Verify JWT token
  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    // Error handling for JWT verification
    if (err) {
      return res.status(403).json({ error: "Invalid token" });
    }

    try {
      // Find the place by id
      const placeData = await Place.findById(id);

      // Check if the user is the owner of the place
      if (!placeData) {
        return res.status(404).json({ error: "Place not found" });
      }

      if (userData.id === placeData.owner.toString()) {
        // Update the place data
        placeData.set({
          title,
          address,
          photos,
          description,
          amenities,
          extraInfo,
          checkIn,
          checkOut,
          maxGuests,
        });

        // Save the updated place
        await placeData.save();
        return res.json({ message: "Place updated successfully!" });
      } else {
        // If the user is not the owner, return forbidden
        return res
          .status(403)
          .json({ error: "You are not the owner of this place" });
      }
    } catch (error) {
      // Error handling for place finding or saving
      return res
        .status(500)
        .json({ error: "An error occurred while updating the place" });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
