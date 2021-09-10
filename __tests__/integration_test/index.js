const request = require("supertest");
const app = require("../../app");

const agent = request.agent(app);
let cookie = null;

beforeAll(function (done) {
  agent
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

// events
describe("Integration test: events", () => {
  it("Get all event with correct cookie", () => {
    return agent
      .get("/api/events/")
      .set("X-ACCESS-TOKEN", cookie)
      .then((response) => {
        expect(response.statusCode).toBe(200);
      });
  });

  it("Get all events with no cookie", () => {
    return agent.get("/api/events/").then((response) => {
      expect(response.statusCode).toBe(401);
    });
  });

  it("Get recent events with correct cookie", () => {
    return agent
      .get("/api/events/top10")
      .set("X-ACCESS-TOKEN", cookie)
      .then((response) => {
        expect(response.statusCode).toBe(200);
      });
  });

  it("Get recent events with no cookie", () => {
    return agent.get("/api/events/top10").then((response) => {
      expect(response.statusCode).toBe(401);
    });
  });
});

// user
describe("Integration test: get user info", () => {
    it("Get user info with correct cookie", () => {
      return agent
        .get("/api/user/info")
        .set("X-ACCESS-TOKEN", cookie)
        .then((response) => {
          expect(response.statusCode).toBe(200);
        });
    });
    it("Get user info with no cookie", () => {
      return agent.get("/api/user/info").then((response) => {
        expect(response.statusCode).toBe(401);
      });
    });
  });
  