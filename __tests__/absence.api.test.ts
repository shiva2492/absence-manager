import request from "supertest";
import app from "../src/server";
import { AbsenceModel } from "../src/api/models/absence.model";
import { AbsenceTypeModel } from "../src/api/models/absenceType.model";
import { MemberModel } from "../src/api/models/member.model";


let token = "";
let adminToken = "";
let newToken = "";
let email = "max@email.com";
let password = "1234";
let adminEmail = "admin@email.com";
let adminPassword = "1234";
let newEmail = "test@email.com";
let newPassword = "1234";


/**
 * Connecting with database before running test cases
 */
beforeAll((done) => {

    // Delay hitting the API, till the server is not running.
    setTimeout(async () => {
        request(app)
            .post("/api/v1/users/login")
            .send({
                email: email,
                password: password,
            })
            .end((err, response) => {
                token = response.body.data[0].token; // save the token!
                done();
            });
        request(app)
            .post("/api/v1/users/signup")
            .send({
                email: newEmail,
                password: newPassword,
            })
            .end((err, response) => {
                request(app)
                    .post("/api/v1/users/login")
                    .send({
                        email: newEmail,
                        password: newPassword,
                    })
                    .end((err, response) => {
                        newToken = response.body.data[0].token; // save the token!
                        done();
                    });
            });
    }, 1000);
});


/**
 * Testing health api
 */
describe("GET /api/v1/health", () => {
    it("should return 200 OK", () => {
        return request(app).get("/api/v1/health")
            .expect(200);
    });
});

/**
 * Testing get absences api
 */
describe("GET /api/v1/absence/", function () {

    // token not being sent - should respond with a 401
    it("It should return 401 Unauthorized", async function (done) {
        let response = await request(app)
            .get("/api/v1/absence/")
        expect(response.header['content-type']).toMatch(/json/);
        expect(response.body.code).toBe(401);
        done();
    });

    // send the token - should respond with a 200
    it("It should return 200 OK", async function (done) {
        let response = await request(app)
            .get("/api/v1/absence/")
            .set('x-access-token', `${token}`)
        expect(response.header['content-type']).toMatch(/json/);
        expect(response.body.code).toBe(200);
        done();
    });

    // for old user, the count should be greater than zero
    it("It should return count greater than or equal to 0", async function (done) {
        let response = await request(app)
            .get("/api/v1/absence/")
            .set('x-access-token', `${token}`)
        expect(response.header['content-type']).toMatch(/json/);
        expect(response.body.code).toBe(200);
        expect(response.body.data.count).toBeGreaterThanOrEqual(0);
        done();
    });

    // for new user, the count should be equal to zero
    it("It should return count equal to 0", async function (done) {
        let response = await request(app)
            .get("/api/v1/absence/")
            .set('x-access-token', `${newToken}`)
        expect(response.header['content-type']).toMatch(/json/);
        expect(response.body.code).toBe(200);
        expect(response.body.data.count).toEqual(0);
        done();
    });
});

/**
 * Testing download iCal File
 */

describe("GET /api/v1/absence/download-iCal", () => {

    // token not being sent - should respond with a 401
    it("It should return 401 Unauthorized", async function (done) {
        let response = await request(app)
            .get("/api/v1/absence/download-iCal")
        expect(response.header['content-type']).toMatch(/json/);
        expect(response.body.code).toBe(401);
        done();
    });

    // for old users, it could return iCal file if there is data.
    it("It should return content type either text/calendar or application/json", async function (done) {
        let response = await request(app)
            .get("/api/v1/absence/download-iCal")
            .set('x-access-token', `${token}`)
        expect(response.header['content-type']).toMatch(/calendar|json/);
        expect(response.status).toBe(200);
        done();
    });

    // for newly created user, it will never return file. 
    it("It should contain application/json as content type", async function (done) {
        let response = await request(app)
            .get("/api/v1/absence/")
            .set('x-access-token', `${newToken}`)
        expect(response.header['content-type']).toMatch(/json/);
        expect(response.body.code).toBe(200);
        expect(response.body.data.count).toBeGreaterThanOrEqual(0);
        done();
    });
});

// afterAll(done => {
//     app.close(done);
// });