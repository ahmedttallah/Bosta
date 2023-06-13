const request = require("supertest");
const app = require("../app");

describe("URL Check CRUD Operations", () => {
  let token;
  beforeAll(async () => {
    // Login to get JWT token
    const response = await request(app).post("/api/v1/auth/login").send({
      email: "ahmedattallah19010@gmail.com",
      password: "kratos19010",
    });

    token = response.body.token;
  });

  it("should create a new URL check", async () => {
    const response = await request(app)
      .post("/api/v1/url-check")
      .set("Authorization", `Bearer ${token}`)
      .send({
        url: "https://example.com",
        name: "string",
        protocol: "string",
        timeout: 5000,
        interval: 60000,
        tags: ["website"],
      });

    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.data).toBeDefined();
    expect(response.body.data.name).toBe("string");
  });
});
