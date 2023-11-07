import mongoose from "mongoose";
import { connect } from "../db";
import app from "../app";
import request from "supertest";

// mock auth middleware
jest.mock("../middlewares/verifyToken.middleware", () => ({
  isAuthenticated: jest.fn((req, res, next) => next()),
}));

describe("Ticket Controller", () => {
  beforeEach(async () => {
    await connect();
  });

  afterAll(async () => {
    // Closes the Mongoose connection
    // await mongoose.disconnect();
    // await mongoose.connection.close()
  })
  

  test("getTicket return 200", async () => {
    const res = await request(app)
      .get("/getTicket/projectId")
      .set("Authorization", "Bearer TOKEN")
      .expect(404);

    expect(res.status).toBe(404);
  });
});
