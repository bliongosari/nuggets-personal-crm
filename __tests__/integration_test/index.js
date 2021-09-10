const request = require("supertest");
const app = require("../../app");

let cookie = null;
let server = null;

beforeAll(function (done) {
  require("../../config/database").establishDB();
  server = app.listen(7080, () =>
  {
    console.log('Listening on port 7080')
  }
  );

  request(server)
    .post("/api/user/login")
    .send({
      email: "a@gmail.com",
      password: "a",
    })
    .end(function (err, res) {
      cookie = res.body.token;
      done();
    });
});

afterAll(() => { 
  require("../../config/database").closeDB();
  server.close(); 
});

// events
describe("Integration test: events", () => {
  it("Get all event with correct cookie", () => {
    return request(server)
      .get("/api/events/")
      .set("X-ACCESS-TOKEN", cookie)
      .then((response) => {
        expect(response.statusCode).toBe(200);
      });
  });

  it("Get all events with no cookie", () => {
    return request(server).get("/api/events/").then((response) => {
      expect(response.statusCode).toBe(401);
    });
  });

  it("Get recent events with correct cookie", () => {
    return request(server)
      .get("/api/events/top10")
      .set("X-ACCESS-TOKEN", cookie)
      .then((response) => {
        expect(response.statusCode).toBe(200);
      });
  });

  it("Get recent events with no cookie", () => {
    return request(server).get("/api/events/top10").then((response) => {
      expect(response.statusCode).toBe(401);
    });
  });
});

// user
describe("Integration test: get user info", () => {
    it("Get user info with correct cookie", () => {
      return request(server)
        .get("/api/user/info")
        .set("X-ACCESS-TOKEN", cookie)
        .then((response) => {
          expect(response.statusCode).toBe(200);
        });
    });
    it("Get user info with no cookie", () => {
      return request(server).get("/api/user/info").then((response) => {
        expect(response.statusCode).toBe(401);
      });
    });
  });
  