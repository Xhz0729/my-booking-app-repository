import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/User.js";
import Place from "./models/Place.js";
import Booking from "./models/Booking.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import imageDownloader from "image-downloader";
import multer from "multer";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import mime from "mime-types";
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname } from "path";
export const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);
import axios from "axios";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

const bucket = "dream-stay-booking-app";

// CORS configuration
const allowedOrigins = [
  "http://localhost:5173",
  "https://dream-stay-booking-app-frontend.vercel.app",
];

app.use(
  cors({
    credentials: true,
    methods: ["GET", "POST", "PUT"],
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  })
);

app.use(express.json());
app.use("/uploads", express.static(__dirname + "/uploads"));

// AWS S3
async function uploadToS3(path, originalFilename, mimetype) {
  // Create an S3 client
  const client = new S3Client({
    region: "us-east-2",
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY_ID,
      secretAccessKey: process.env.S3_SECRET_ACCESS,
    },
  });
  // Extract the file extension from the original filename
  const parts = originalFilename.split(".");
  const ext = parts[parts.length - 1];
  // Generate a new filename with the current timestamp and the original extension
  const newFilename = Date.now() + "." + ext;
  // Send the file to the S3 bucket
  await client.send(
    new PutObjectCommand({
      Bucket: bucket,
      Body: fs.readFileSync(path),
      Key: newFilename,
      ContentType: mimetype,
      ACL: "public-read",
    })
  );
  // Return the URL of the uploaded file
  return `https://${bucket}.s3.amazonaws.com/${newFilename}`;
}

// Use the cookieParser middleware to parse cookies
app.use(cookieParser());

const jwtSecret = process.env.JWT_SECRET;

// Get user data from request
function getUserDataFromToken(req) {
  // Get the token from the cookies
  const { token } = req.cookies;
  // Return a promise that resolves with the user data
  return new Promise((resolve, reject) => {
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) {
        reject(err);
      } else {
        resolve(userData);
      }
    });
  });
}

// Route for register a new user
app.post("/api/register", async (req, res) => {
  mongoose.connect(process.env.MONGO_URL);
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
app.post("/api/login", async (req, res) => {
  mongoose.connect(process.env.MONGO_URL);
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
app.get("/api/profile", async (req, res) => {
  mongoose.connect(process.env.MONGO_URL);
  // Get userData by calling the function getUserDataFromToken
  const userData = await getUserDataFromToken(req);
  const { name, email, _id } = await User.findById(userData.id);
  res.json({ name, email, _id });
});

// Post route to logout
app.post("/api/logout", (req, res) => {
  res.cookie("token", "").json(true);
});

// POST route to upload an image by URL
app.post("/api/upload-by-url", async (req, res) => {
  const { link } = req.body;
  const newName = "photo" + Date.now() + ".jpg";
  await imageDownloader.image({
    url: link,
    dest: "/tmp/" + newName,
  });
  const url = await uploadToS3(
    "/tmp/" + newName,
    newName,
    mime.lookup("/tmp/" + newName)
  );
  res.json(url);
});

// Middleware to handle file uploads
const photosMiddleware = multer({ dest: "/tmp" });
// POST route to upload images from the local device
app.post(
  "/api/upload",
  photosMiddleware.array("photos", 100),
  async (req, res) => {
    const uploadedFiles = [];
    for (let i = 0; i < req.files.length; i++) {
      const { path, originalname, mimetype } = req.files[i];
      const url = await uploadToS3(path, originalname, mimetype);
      uploadedFiles.push(url);
    }
    res.json(uploadedFiles);
  }
);

// POST route to create a new place
app.post("/api/places", (req, res) => {
  mongoose.connect(process.env.MONGO_URL);
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
    price,
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
      price,
    });
    res.json(newPlace);
  });
});

// Get route to retrieve all places related to the user by user id
app.get("/api/places", async (req, res) => {
  mongoose.connect(process.env.MONGO_URL);
  // Get userData by calling the function getUserDataFromToken
  const userData = await getUserDataFromToken(req);
  const { id } = userData;
  // Find all places that belong to the user
  const places = await Place.find({ owner: id });
  res.json(places);
});

// Get route to retrieve a single place by id
app.get("/api/places/:id", async (req, res) => {
  mongoose.connect(process.env.MONGO_URL);
  const { id } = req.params;
  res.json(await Place.findById(id));
});

// Put route to update a place by id
app.put("/api/places", async (req, res) => {
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
    price,
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
          price,
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

// Route to fetch all the places
app.get("/api/all-places", async (req, res) => {
  mongoose.connect(process.env.MONGO_URL);
  res.json(await Place.find());
});

// Route to fetch the place details by place id
app.get("/api/place/:id", async (req, res) => {
  mongoose.connect(process.env.MONGO_URL);
  const { id } = req.params;
  res.json(await Place.findById(id));
});

// Route to geocoding my address
app.get("/api/geocode", async (req, res) => {
  const { address } = req.query;
  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
        address
      )}&key=${process.env.GOOGLE_MAPS_API_KEY}`
    );
    const { results } = response.data;
    if (results.length > 0) {
      const location = results[0].geometry.location;
      res.json(location);
    } else {
      res.status(404).json({ message: "Location not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching coordinates" });
  }
});

// Endpoint to post a booking
app.post("/api/bookings", async (req, res) => {
  // Connect to the MongoDB database
  mongoose.connect(process.env.MONGO_URL);
  // Get userData by calling the function getUserDataFromToken
  const userData = await getUserDataFromToken(req);
  const { place, checkIn, checkOut, numberOfGuests, name, email, price } =
    req.body;
  // Create a new booking
  Booking.create({
    place,
    checkIn,
    checkOut,
    numberOfGuests,
    name,
    email,
    price,
    user: userData.id,
  })
    .then((data) => {
      res.json(data); // Return the booking data
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: "Error creating the booking" }); // Error handling
    });
});

// Endpoint to get all bookings
app.get("/api/bookings", async (req, res) => {
  // Connect to the MongoDB database
  mongoose.connect(process.env.MONGO_URL);
  // Get userData by calling the function getUserDataFromToken
  const userData = await getUserDataFromToken(req);
  // Find all bookings that belong to the user
  const bookings = await Booking.find({ user: userData.id }).populate("place");
  res.json(bookings);
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

export default app;
