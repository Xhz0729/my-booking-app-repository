import request from "supertest";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import app from "../index.js"; // Adjust path as necessary
import User from "../models/User"; // Adjust path as necessary

// Mock the User model and its methods
jest.mock("../models/User");

describe("POST /api/register", () => {
  beforeAll(() => {
    mongoose.connect = jest.fn().mockResolvedValue(); // Mock mongoose connection
  });

  afterEach(() => {
    jest.clearAllMocks(); // Clear mocks after each test
  });

  afterAll(async () => {
    await mongoose.disconnect();
    jest.resetAllMocks();
  }); // Close connection and reset mocks

  it("should register a new user successfully", async () => {
    // Mock the bcrypt.hash method
    const hashedPassword = "password";
    bcrypt.hash = jest.fn().mockResolvedValue(hashedPassword);

    // Mock the User.create method directly
    User.create = jest.fn().mockResolvedValue({
      name: "Test",
      email: "Test@example.com",
      password: hashedPassword,
    });

    // Send a POST request to the server
    const response = await request(app).post("/api/register").send({
      name: "Test",
      email: "Test@example.com",
      password: "password",
    });

    // Check the response
    expect(response.status).toBe(200);

    // Check if the User.create method was called
    expect(User.create).toHaveBeenCalledTimes(1);

    // Check if the response body contains the expected properties
    expect(response.body).toHaveProperty("name", "Test");
    expect(response.body).toHaveProperty("email", "Test@example.com");
    expect(response.body).toHaveProperty("password", hashedPassword);
  });
});
