const supertest = require("supertest");
const { omit } = require("underscore");

const app = require("../../app");
const User = require("../../src/db/user");
const dbConnect = require("../../src/db/connect");
const catchExceptions = require("../../src/middlewares/exception_handling");

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
  await deleteAllUserFromDatabase();
  conn.connection.close();
});

describe("user registration", () => {
  const userObj = {
    name: "jazimabbas",
    email: "jazimabbas@gmail.com",
    password: "password",
    company: "softwarehub",
  };

  it("create user and store in db if user not exists with the same email", async () => {
    const res = await request.post("/auth/register").send(userObj);
    const _user = { ...userObj, isEmailVerified: false, isAdmin: false };
    const userInDb = await getUserByEmail(_user.email);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("message");
    expect(userInDb).toMatchObject(omit(_user, "password"));
    expect(userInDb).toBeDefined();
  });

  it("throw error if email already exists when wanna register", async () => {
    const res = await request.post("/auth/register").send(userObj);

    expect(res.status).toBe(400);
  });

  it("throw validation error if we register with incompleted user data", async () => {
    const res = await request.post("/auth/register");
    const errorObj = JSON.parse(res.error.text);

    expect(res.status).toBe(422);
    expect(errorObj).toHaveProperty("errors");
  });

  it("should hash password before save to database when registering user", async () => {
    await deleteAllUserFromDatabase();

    const res = await request.post("/auth/register").send(userObj);
    const userInDb = await getUserByEmail(userObj.email);

    expect(res.status).toBe(200);
    expect(userInDb).toBeDefined();
    expect(userInDb.password).not.toBe(userObj.password);
  });
});

describe("user login", () => {
  it("should throw validation error if we don't provide email & password", async () => {
    const res = await request.post("/auth/login");
    const errorObj = JSON.parse(res.error.text);

    expect(res.status).toBe(422);
    expect(errorObj).toHaveProperty("errors");
  });

  it("should throw error if email or password doen't exist", async () => {
    const userCredentials = { email: "abc@gmail.com", password: "password" };

    const res = await request.post("/auth/login").send(userCredentials);

    expect(res.status).toBe(400);
  });

  it("get user detail along with token if email and password exist in db", async () => {
    const userCredentials = {
      email: "jazimabbas@gmail.com",
      password: "password",
    };

    const res = await request.post("/auth/login").send(userCredentials);
    const userRes = res.body.user;

    expect(res.status).toBe(200);
    expect(userRes).toBeDefined();
    expect(userRes).toHaveProperty("token");
    expect(userRes).not.toHaveProperty("password");
  });
});

function getUserByEmail(email) {
  return User.findOne({ email });
}

async function deleteAllUserFromDatabase() {
  await User.deleteMany();
}
