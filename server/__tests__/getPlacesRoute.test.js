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

describe("GET /api/places", () => {
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

  // Test the fetch places route working correctly with valid token and user ID
  it("should retrieve all places associated with the user ID", async () => {
    // Sample data that Place.find should return
    const mockPlaces = [
      {
        _id: "placeId1",
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
      },
    ];

    // Mock the Place.find method to return mock data
    Place.find.mockResolvedValue(mockPlaces);

    const response = await request(app)
      .get("/api/places")
      .set("Cookie", `token=${validToken}`);

    // Check if the response status is 200
    expect(response.status).toBe(200);
    // Check if the response body equals the mock data
    expect(response.body).toEqual(mockPlaces);
    // Check if Place.find was called with the correct arguments
    expect(Place.find).toHaveBeenCalledWith({ owner: mockUserData.id });
  });

  // Test error handling for the fetch places route
  it("should return 500 if an error occurs while fetching places", async () => {
    // Mock error when Place.find is called
    Place.find.mockImplementation(() => {
      throw new Error("Database error");
    });

    const response = await request(app)
      .get("/api/places")
      .set("Cookie", `token=${validToken}`);

    // Verify response for error case
    expect(response.status).toBe(500);
    expect(response.body).toEqual({
      error: "An error occurred while fetching accommodations listed by user",
    });
  });
});
