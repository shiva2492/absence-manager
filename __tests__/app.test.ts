import request from "supertest";
import app from "../src/config/app";


/**
 * Testing 404 error handling
 */
describe("GET /random-url", () => {
  it("should return 404", (done) => {
    request(app).get("/reset")
      .expect(404, done);
  });
});
