import mongoose from "mongoose";
import request from "supertest";
import app from "../index.js";
import Place from "../models/Place";

// Mock mongoose connect
mongoose.connect = jest.fn().mockResolvedValue();

// Mock the Place model
jest.mock("../models/Place");

describe("GET /api/places/:id", () => {
  const mockPlaceId = "mockPlaceId";

  // Mock the place data
  const mockPlaceData = {
    _id: mockPlaceId,
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

  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(async () => {
    await mongoose.disconnect();
    jest.resetAllMocks();
  });

  it("should retrieve a place by its ID", async () => {
    // Mock the Place.findById method to return mockPlaceData
    Place.findById.mockResolvedValue(mockPlaceData);

    const response = await request(app).get(`/api/places/${mockPlaceId}`);

    // Verify response for success case
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockPlaceData);
    expect(Place.findById).toHaveBeenCalledWith(mockPlaceId);
  });
});
