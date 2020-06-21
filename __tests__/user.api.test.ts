import request from "supertest";
import app from "../src/config/app";
/**
 * Connecting with database before running test cases
 */
beforeAll(async () => {
    setTimeout(() => {
        import("../src/config/mongoose");
    }, 4000);
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
 * Testing post /users/signup endpoint
 */
describe("POST /api/v1/users/signup", function () {
    let data = {
        // no parameters
    };
    it("It should return 400 BAD REQUEST without parameters", function (done) {
        request(app)
            .post("/api/v1/users/signup")
            .send(data)
            .set("Content-Type", "application/json")
            .expect("Content-Type", /json/)
            .expect(400)
            .end((err) => {
                if (err) return done(err);
                done();
            });
    });



    let data2 = {
        email: ''
    }
    it("It should return 400 BAD REQUEST with only email parameter", function (done) {
        request(app)
            .post("/api/v1/users/signup")
            .send(data2)
            .set("Content-Type", "application/json")
            .expect("Content-Type", /json/)
            .expect(400)
            .end((err) => {
                if (err) return done(err);
                done();
            });
    });

    let data3 = {
        email: 'test@gmail.com'
    }
    it("It should return 400 BAD REQUEST with only email parameter", function (done) {
        request(app)
            .post("/api/v1/users/signup")
            .send(data3)
            .set("Content-Type", "application/json")
            .expect("Content-Type", /json/)
            .expect(400)
            .end((err) => {
                if (err) return done(err);
                done();
            });
    });


    let data4 = {
        email: 'test',
        password: 'test'
    }
    it("It should return 400 BAD REQUEST with wrong email parameter", function (done) {
        request(app)
            .post("/api/v1/users/signup")
            .send(data4)
            .set("Content-Type", "application/json")
            .expect("Content-Type", /json/)
            .expect(400)
            .end((err) => {
                if (err) return done(err);
                done();
            });
    });




    let data5 = {
        email: 'john@doe.com',
        password: '1234'
    }

    it("It should return 200 OK when the user already exists", function (done) {
        request(app)
            .post("/api/v1/users/signup")
            .send(data5)
            .set("Content-Type", "application/json")
            .expect("Content-Type", /json/)
            .expect(200)
            .end((err, data) => {
                if (err) return done(err);
                done();
            });
    });

    let data6 = {
        email: 'test2@doe.com',
        password: '1234'
    }

    it("It should return 201 CREATED when the req.body parameter are correct", function (done) {
        request(app)
            .post("/api/v1/users/signup")
            .send(data6)
            .set("Content-Type", "application/json")
            .expect("Content-Type", /json/)
            .expect(201)
            .end((err, data) => {
                if (err) return done(err);
                done();
            });
    });

});




/**
 * Testing post /users/login endpoint
 */
describe("POST /api/v1/users/login", function () {
    let data = {
        // no parameters
    };
    it("It should return 400 BAD REQUEST without parameters", function (done) {
        request(app)
            .post("/api/v1/users/login")
            .send(data)
            .set("Content-Type", "application/json")
            .expect("Content-Type", /json/)
            .expect(400)
            .end((err) => {
                if (err) return done(err);
                done();
            });
    });



    let data2 = {
        email: ''
    }
    it("It should return 400 BAD REQUEST with only email parameter", function (done) {
        request(app)
            .post("/api/v1/users/login")
            .send(data2)
            .set("Content-Type", "application/json")
            .expect("Content-Type", /json/)
            .expect(400)
            .end((err) => {
                if (err) return done(err);
                done();
            });
    });

    let data3 = {
        email: 'test@gmail.com'
    }
    it("It should return 400 BAD REQUEST with only email parameter", function (done) {
        request(app)
            .post("/api/v1/users/login")
            .send(data3)
            .set("Content-Type", "application/json")
            .expect("Content-Type", /json/)
            .expect(400)
            .end((err) => {
                if (err) return done(err);
                done();
            });
    });


    let data4 = {
        email: 'test',
        password: 'test'
    }
    it("It should return 400 BAD REQUEST with wrong email parameter", function (done) {
        request(app)
            .post("/api/v1/users/login")
            .send(data4)
            .set("Content-Type", "application/json")
            .expect("Content-Type", /json/)
            .expect(400)
            .end((err) => {
                if (err) return done(err);
                done();
            });
    });




    let data5 = {
        email: 'john@doe.com',
        password: '12345'
    }

    it("It should return 401 UNAUTHORISED with when the password is incorrect", function (done) {
        request(app)
            .post("/api/v1/users/login")
            .send(data5)
            .set("Content-Type", "application/json")
            .expect("Content-Type", /json/)
            .expect(401)
            .end((err, data) => {
                if (err) return done(err);
                done();
            });
    });

    let data6 = {
        email: 'johnhh@doea.com',
        password: '12345'
    }

    it("It should return 401 UNAUTHORISED with when the password is correct but email is incorrect", function (done) {
        request(app)
            .post("/api/v1/users/login")
            .send(data6)
            .set("Content-Type", "application/json")
            .expect("Content-Type", /json/)
            .expect(401)
            .end((err, data) => {
                if (err) return done(err);
                done();
            });
    });

    let data7 = {
        email: 'john@doe.com',
        password: '1234'
    }

    it("It should return 200 OK when the credentials ] are correct", function (done) {
        request(app)
            .post("/api/v1/users/login")
            .send(data7)
            .set("Content-Type", "application/json")
            .expect("Content-Type", /json/)
            .expect(200)
            .end((err, data) => {
                if (err) return done(err);
                done();
            });
    });

});




