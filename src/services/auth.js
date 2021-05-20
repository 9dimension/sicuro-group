const User = require("../db/user");
const Exception = require("../utils/custom_exceptions");

exports.register = async function (user) {
  const userInDb = await findUserByEmail(user.email);

  if (userInDb)
    throw new Exception.EmailExist("Please try with different email");

  const _user = new User({ ...user });
  return await _user.save();
};

exports.login = async function (user) {
  const { email, password } = user;
  const userInDb = await findUserByEmail(email);

  if (!userInDb || !(await userInDb.comparePassword(password)))
    throw new Exception.CredentialsNotMatched();

  return userInDb;
};

// exports.isEmailExists = async function (email) {
//   const userInDb = await findUserByEmail(email);
//   if (!userInDb) throw new Exception.EmailNotExists("Email is not exist");
//   return userInDb;
// };

// exports.verifyEmail = async function (userId) {
//   const user = await User.findById(userId);
//   user.isEmailVerified = true;
//   await user.save();
// };

function findUserByEmail(email) {
  return User.findOne({ email });
}
