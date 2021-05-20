const { omit } = require("underscore");

module.exports = async function setTokenInUserObj(user) {
  const _user = { ...user._doc, token: await user.generateToken() };
  return omit(_user, "password", "__v");
};
