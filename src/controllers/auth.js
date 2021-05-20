const authService = require("../services/auth");
const validations = require("../utils/validations/auth");
const schemaValidate = require("../utils/validations/validate");
const setTokenInUserObj = require("../utils/set_token_in_user");

async function register(req, res) {
  const cleanFields = await schemaValidate(
    validations.registerSchema,
    req.body
  );
  await authService.register(cleanFields);
  res.send({ message: "Successfully created ther user .." });
}

async function login(req, res) {
  const cleanFields = await schemaValidate(validations.loginSchema, req.body);
  const user = await authService.login(cleanFields);
  const userWithTokenField = await setTokenInUserObj(user);
  res.send({ user: userWithTokenField });
}

module.exports = { register, login };
