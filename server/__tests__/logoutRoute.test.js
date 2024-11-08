import request from "supertest";
import app from "../index.js";

describe("POST /api/logout", () => {
  it("should clear the token cookie and return true", async () => {
    // Send a request to the logout endpoint
    const response = await request(app)
      .post("/api/logout")
      .set("Cookie", "token=valid.jwt.token");

    // Check if the status code is 200 (OK)
    expect(response.status).toBe(200);
    // Check if the response body is true
    expect(response.body).toBe(true);
    // Expires is set to Unix epoch to clear the cookie from the client immediately
    expect(response.headers["set-cookie"]).toEqual([
      "token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; Secure; SameSite=None",
    ]);
  });
});
