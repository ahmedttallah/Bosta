const request = require("supertest");
const app = require("../app");

describe("User Authentication", () => {
  let token;

  it("should register a new user", async () => {
    const response = await request(app).post("/api/v1/auth/signup").send({
      username: "testuser",
      email: "test@example.com",
      password: "password",
    });

    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
  });

  it("should log in an existing user", async () => {
    const response = await request(app).post("/api/v1/auth/login").send({
      email: "ahmedattallah19010@gmail.com",
      password: "kratos19010",
    });

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.token).toBeDefined();

    // Store the JWT token for future use
    token = response.body.token;
  });

  it("should return current user's details", async () => {
    const response = await request(app)
      .get("/api/v1/auth/current-user")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
   expect(response.body.user.email).toBe("ahmedattallah19010@gmail.com");
  });
});
