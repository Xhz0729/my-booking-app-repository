import mongoose from "mongoose";
import request from "supertest";
import app from "../index.js";
import Place from "../models/Place";

// Mock mongoose connect
mongoose.connect = jest.fn().mockResolvedValue();

// Mock the Place model
jest.mock("../models/Place");

describe("GET /api/all-places", () => {
  // Mock the place data
  const mockPlaceData = [
    {
      _id: 1,
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
    {
      _id: 2,
      title: "Curry's Place",
      address: "350 Cypress St",
      photos: ["photo1.jpg", "photo2.jpg"],
      description: "A beautiful place to stay.",
      amenities: ["wifi", "pool"],
      extraInfo: "No pets allowed.",
      checkIn: 14,
      checkOut: 11,
      maxGuests: 4,
      price: 100,
    },
  ];

  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(async () => {
    await mongoose.disconnect();
    jest.resetAllMocks();
  });

  // Test success case for the getAllPlaces route
  it("should retrieve all places from database", async () => {
    // Mock the Place.findById method to return mockPlaceData
    Place.find.mockResolvedValue(mockPlaceData);

    const response = await request(app).get("/api/all-places/");

    // Check the response status, body, and if the Place.find method was called once
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockPlaceData);
    expect(Place.find).toHaveBeenCalledTimes(1);
  });
});
