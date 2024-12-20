import request from "supertest";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import app from "../index.js";
import User from "../models/User";

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

  // Test error handling for the register route
  it("should return 400 if there's an error", async () => {
    User.create = jest
      .fn()
      .mockRejectedValue(new Error("User creation failed"));

    // Send a POST request to the server without the email field
    const response = await request(app)
      .post("/api/register")
      .send({ name: "John Doe", email: "john@example.com" });

    // Check the response status and message
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "User creation failed");
  });
});
