const mongoose = require("mongoose");
const journal_controller = require("../../controllers/journal_controller");
const auth_controller = require("../../controllers/auth_controller");
const User = require("../../models/user");
const dotenv = require("dotenv");
require("dotenv").config();

describe("Testing user controller", () => {
  let res, req;
  // before each test mock the mongoose function
  beforeAll(() => {
    require("../../config/database").establishDB();
    res = {
      send: function () {},
      json: function (d) {},
      status: function (s) {
        this.statusCode = s;
        return this;
      },
    };
  });

  afterAll(() => {
    require("../../config/database").closeDB();
  });

  test("Testing correct id for user info", async () => {
    req = {
      user: { id: "61250cf49eb2e4127ae7d334" },
    };
    await auth_controller.getInfo(req, res);
    expect(res.statusCode).toEqual(200);
  });

  test("Testing wrong id for user info", async () => {
    req = {
      user: { id: "aaaa" },
    };
    await auth_controller.getInfo(req, res);
    expect(res.statusCode).toEqual(401);
  });
});
