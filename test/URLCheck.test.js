const request = require("supertest");
const app = require("../app");

describe("URL Check CRUD Operations", () => {
  let token;
  beforeAll(async () => {
    // Login to get JWT token
    const response = await request(app).post("/api/v1/auth/login").send({
      email: "test@example.com",
      password: "password",
    });

    token = response.body.token;
  });

  it("should create a new URL check", async () => {
    const response = await request(app)
      .post("/api/v1/url-check")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Test Check",
        url: "http://example.com",
        // other properties
      });

    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.data).toBeDefined();
    expect(response.body.data.name).toBe("Test Check");
  });

  it("should update an existing URL check", async () => {
    const response = await request(app)
      .put("/api/v1/url-check/:id")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Updated Check",
        // other properties
      });

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data).toBeDefined();
    expect(response.body.data.name).toBe("Updated Check");
  });

  it("should delete an existing URL check", async () => {
    const response = await request(app)
      .delete("/api/v1/url-check/:id")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe("URL check deleted");
  });
});
