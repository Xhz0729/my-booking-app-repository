import request from "supertest";
import app from "../index.js";
import User from "../models/User";
import jwt from "jsonwebtoken";

// Mock the User model
jest.mock("../models/User");

// Mock jsonwebtoken
jest.mock("jsonwebtoken");

describe("GET /api/profile", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  // Test token verification middleware, case no token provided
  it("should return 403 if token is not provided", async () => {
    // Set Cookie header to an empty string to simulate no token
    const response = await request(app).get("/api/profile").set("Cookie", "");

    // Check the response status and body
    expect(response.status).toBe(403);
    expect(response.body).toHaveProperty("error", "No token provided");
  });

  it("should return user profile if token is valid", async () => {
    // Mock the decoded JWT payload
    const mockDecodedToken = { id: "userId" };
    jwt.verify.mockImplementation((token, secret, options, callback) => {
      callback(null, mockDecodedToken);
    });

    // Mock User data
    const mockUser = {
      _id: "userId",
      email: "user@example.com",
      name: "Test User",
    };

    // Mock the User.findById method
    User.findById.mockResolvedValue(mockUser);

    // Generate a valid mock token
    const mockToken = "valid.jwt.token";

    const response = await request(app)
      .get("/api/profile")
      .set("Cookie", `token=${mockToken}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      name: mockUser.name,
      email: mockUser.email,
      _id: mockUser._id,
    });
  });
});
