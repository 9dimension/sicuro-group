const supertest = require("supertest");

const app = require("../../app");
const dbConnect = require("../../src/db/connect");
const catchExceptions = require("../../src/middlewares/exception_handling");
const { User, BusDetail, Summary } = require("../../src/db");

const request = supertest(app);
let conn;

beforeEach(() => {
  const defaultErrorHandler = jest.fn(catchExceptions);
  app.use(defaultErrorHandler);
});

beforeAll(async () => {
  conn = await dbConnect();
});

afterAll(async () => {
  conn.connection.close();
});

afterEach(async () => {
  await cleanDatabase();
});

describe("tests for business detail", () => {
  const busDetail = {
    introduction: "ab",
    sellingPoint: "ab",
    competitor: "ab",
    targetMarket: "ab",
    client: "ab",
  };

  test("should throw error if we don't pass the token with request header", async () => {
    const res = await request.post("/bus-detail");

    expect(res.status).toBe(401);
  });

  describe("store record of business detail", () => {
    test("should throw validation errors if we create bus detail with incomplete fields", async () => {
      const res = await request
        .post("/bus-detail")
        .set("authorization", await getUserToken());
      const errResObj = JSON.parse(res.error.text);

      expect(res.status).toBe(422);
      expect(errResObj).toHaveProperty("errors");
    });

    test("should create new record of bus detail and store in database", async () => {
      const res = await request
        .post("/bus-detail")
        .set("authorization", await getUserToken())
        .send(busDetail);
      const busDetailInDb = await BusDetail.findOne({
        introduction: busDetail.introduction,
      });

      expect(res.status).toBe(200);
      expect(busDetailInDb).not.toBeNull();
      expect(busDetailInDb._doc).toHaveProperty("introduction");
    });

    test("should throw error if we create record for some user that has been already created", async () => {
      const user = await getNewUser();
      await insertRecordOfBusDetail(user._id);

      const res = await request
        .post("/bus-detail")
        .set("authorization", await user.generateToken())
        .send(busDetail);

      expect(res.status).toBe(400);
    });

    test("should create the record of summary if bus detail is successfully created", async () => {
      const res = await request
        .post("/bus-detail")
        .set("authorization", await getUserToken())
        .send(busDetail);

      const busDetailInDb = await BusDetail.findOne({
        introduction: busDetail.introduction,
      });
      const summaryInDb = await Summary.findOne({
        busDetail: busDetailInDb._id,
      });

      expect(res.status).toBe(200);
      expect(summaryInDb).not.toBeNull();
      expect(summaryInDb).toHaveProperty("busDetail");
    });
  });

  describe("update record of businees detail", () => {
    test("should throw validation error if don't pass complete detail", async () => {
      const res = await request
        .patch("/bus-detail/12")
        .set("authorization", await getUserToken());
      const errResObj = JSON.parse(res.error.text);

      expect(res.status).toBe(422);
      expect(errResObj).toHaveProperty("errors");
    });

    test("should throw error if param id is invalid", async () => {
      const res = await request
        .patch("/bus-detail/12")
        .set("authorization", await getUserToken())
        .send(busDetail);

      expect(res.status).toBe(404);
    });

    test("should update record of bus detail", async () => {
      const user = await getNewUser();
      await insertRecordOfBusDetail(user._id);

      const busDetailInDb = await BusDetail.findOne({
        introduction: "abc",
      });

      expect(busDetailInDb).not.toBeNull();

      const updadtedBusDetail = { ...busDetail, introduction: "abcd" };
      const res = await request
        .patch("/bus-detail/" + busDetailInDb._id)
        .set("authorization", await user.generateToken())
        .send(updadtedBusDetail);

      const updatedRecordInDb = await BusDetail.findById(busDetailInDb._id);

      expect(res.status).toBe(200);
      expect(updatedRecordInDb).not.toBeNull();
      expect(updatedRecordInDb._doc.introduction).toBe(
        updadtedBusDetail.introduction
      );
    });
  });

  test("should fetch the single record of bus detail from database", async () => {
    const user = await getNewUser();
    const token = await user.generateToken();
    await insertRecordOfBusDetail(user._id);

    const res = await request.get("/bus-detail").set("authorization", token);

    const busDetail = res.body.busDetail;

    expect(res.status).toBe(200);
    expect(busDetail).toBeDefined();
    expect(busDetail).not.toBeNull();
  });

  describe("delete record of bus detail", () => {
    test("should throw error if pass invalid param id", async () => {
      const res = await request
        .delete("/bus-detail/12")
        .set("authorization", await getUserToken());

      expect(res.status).toBe(404);
    });

    test("should delete the bus detail record along with summary record", async () => {
      const user = await getNewUser();
      const busDetail = await insertRecordOfBusDetail(user._id);

      let busDetailRecord = await BusDetail.findOne({ user: user._id });
      let summaryRecord = await Summary.findOne({ user: user._id });

      expect(busDetailRecord).not.toBeNull();
      expect(summaryRecord).not.toBeNull();

      const res = await request
        .delete("/bus-detail/" + busDetail._id)
        .set("authorization", await user.generateToken());

      busDetailRecord = await BusDetail.findOne({ user: user._id });
      summaryRecord = await Summary.findOne({ user: user._id });

      expect(res.status).toBe(200);
      expect(busDetailRecord).toBeNull();
      expect(summaryRecord).toBeNull();
    });
  });
});

async function cleanDatabase() {
  await User.deleteMany();
  await Summary.deleteMany();
  await BusDetail.deleteMany();
}

async function getNewUser() {
  let user = new User({
    name: "abc",
    email: "abc@gmail.com",
    password: "pass",
  });

  return await user.save();
}

async function getUserToken() {
  const user = await getNewUser();
  const token = await user.generateToken();
  return token;
}

async function insertRecordOfBusDetail(userId) {
  const busDetailRecord = new BusDetail({
    user: userId,
    introduction: "abc",
    targetMarket: "abc",
  });
  return await busDetailRecord.save();
}
