import request from "supertest";
import app from "../index.js";
import User from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Mock the User model and its methods
jest.mock("../models/User");

// Mock bcrypt and jsonwebtoken
jest.mock("bcrypt");
jest.mock("jsonwebtoken");

describe("POST /api/login", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  // Test the login route with correct email and password
  it("login with correct email and password", async () => {
    const mockUser = {
      _id: "userId",
      email: "user@example.com",
      password: "hashedPassword",
    };

    // Mock User.findOne to simulate finding the user in the database
    User.findOne.mockResolvedValue(mockUser);

    // Mock bcrypt.compare to simulate password check
    bcrypt.compare.mockResolvedValue(true);

    // Mock jwt.sign to simulate successful token generation
    const mockToken = "mockToken";
    jwt.sign.mockImplementation((payload, jwtSecret, options, callback) => {
      callback(null, mockToken);
    });

    // Send a POST request to the server
    const response = await request(app)
      .post("/api/login")
      .send({ email: "user@example.com", password: "rightPassword" });

    expect(response.status).toBe(200);
    // Check if the response body user equals the mock user
    expect(response.body.user).toEqual(mockUser);
    // Check if the response header has a set-cookie field
    expect(response.headers["set-cookie"]).toBeDefined();
    // Check if the token is set in the cookie
    expect(response.headers["set-cookie"][0]).toContain("token=mockToken");
  });
});
