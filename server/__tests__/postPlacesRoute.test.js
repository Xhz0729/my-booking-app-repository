import mongoose from "mongoose";
import request from "supertest";
import app from "../index.js";
import jwt from "jsonwebtoken";
import Place from "../models/Place";

// Mock mongoose connect
mongoose.connect = jest.fn().mockResolvedValue();

// Mock the Place model
jest.mock("../models/Place");

// Mock the jwt.verify method
jest.mock("jsonwebtoken");

describe("POST /api/places", () => {
  const validToken = "mockValidToken";
  const mockUserData = { id: "userId" };

  // Mock the jwt.verify method
  beforeEach(() => {
    jwt.verify.mockImplementation((token, secret, options, callback) => {
      if (token === validToken) {
        callback(null, mockUserData);
      } else if (!token) {
        callback(new Error("No token provided"));
      } else {
        callback(new Error("Invalid token"));
      }
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(async () => {
    await mongoose.disconnect();
    jest.resetAllMocks();
  });

  it("create a new place when valid token and data are provided", async () => {
    const mockPlace = {
      owner: mockUserData.id,
      title: "Zoe's Place",
      address: "123 Cypress St",
      photos: ["photo1.jpg", "photo2.jpg"],
      description: "A beautiful place to stay.",
      amenities: ["wifi", "pool"],
      extraInfo: "No pets allowed.",
      checkIn: 14,
      checkOut: 11,
      maxGuests: 4,
      price: 120,
    };

    // Mock the Place.create method
    Place.create.mockResolvedValue(mockPlace);

    // Send a POST request to the server
    const response = await request(app)
      .post("/api/places")
      .set("Cookie", `token=${validToken}`)
      .send({
        title: "Zoe's Place",
        address: "123 Cypress St",
        photos: ["photo1.jpg", "photo2.jpg"],
        description: "A beautiful place to stay.",
        amenities: ["wifi", "pool"],
        extraInfo: "No pets allowed.",
        checkIn: 14,
        checkOut: 11,
        maxGuests: 4,
        price: 120,
      });

    // Check the status code, response body, and Place.create method call
    expect(response.status).toBe(200);
    expect(response.body).toMatchObject(mockPlace);
    expect(Place.create).toHaveBeenCalledWith({
      owner: mockUserData.id,
      title: "Zoe's Place",
      address: "123 Cypress St",
      photos: ["photo1.jpg", "photo2.jpg"],
      description: "A beautiful place to stay.",
      amenities: ["wifi", "pool"],
      extraInfo: "No pets allowed.",
      checkIn: 14,
      checkOut: 11,
      maxGuests: 4,
      price: 120,
    });
  });
});
