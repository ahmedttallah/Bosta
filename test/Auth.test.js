const request = require("supertest");
const app = require("../app");

describe("User Authentication", () => {
  it("should register a new user", async () => {
    const response = await request(app).post("/api/v1/auth/signup").send({
      username: "testuser",
      email: "test@example.com",
      password: "password",
    });

    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.token).toBeDefined();
  });

  it("should log in an existing user", async () => {
    const response = await request(app).post("/api/v1/auth/login").send({
      email: "test@example.com",
      password: "password",
    });

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.token).toBeDefined();
  });

  it("should return current user's details", async () => {
    const response = await request(app)
      .get("/api/v1/auth/me")
      .set("Authorization", "Bearer <jwt_token>");

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data).toBeDefined();
    expect(response.body.data.email).toBe("test@example.com");
  });
});
