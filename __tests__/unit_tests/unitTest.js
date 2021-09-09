const mongoose = require("mongoose");
const journal_controller = require("../../controllers/journal_controller");
const auth_controller = require("../../controllers/auth_controller");
const Journal = require("../../models/journal");
const dotenv = require("dotenv");
require("dotenv").config();

describe("Testing  journal controller", () => {
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

  test("Testing correct id: should be successful. Return status 200", async () => {
    req = {
      user: { id: "61250cf49eb2e4127ae7d334" },
    };
    await journal_controller.getAll(req, res);

    expect(res.statusCode).toEqual(200);
  });

  test("Testing an invalid id for getting journals. Return status 401", async () => {
    req = {
      user: { id: "123" },
    };
    await journal_controller.getAll(req, res);
    expect(res.statusCode).toEqual(401);
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
