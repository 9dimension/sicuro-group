const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { pick } = require("underscore");
const jwt = require("jsonwebtoken");
const config = require("config");

const userSchema = new mongoose.Schema({
  name: String,
  company: String,
  email: {
    type: String,
    unique: true,
  },
  password: String,
  isEmailVerified: {
    type: Boolean,
    default: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

userSchema.pre("save", hashPassword);
function hashPassword(next) {
  var user = this;

  if (!user.password) return next();

  if (!user.isModified("password")) return next();

  bcrypt.genSalt(10, function (err, salt) {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
}

userSchema.method("comparePassword", async function (password) {
  return await bcrypt.compare(password, this.password);
});

userSchema.method("generateToken", async function () {
  const payload = pick(
    this,
    "_id",
    "name",
    "email",
    "isAdmin",
    "isEmailVerified"
  );

  const token = jwt.sign(payload, config.get("jwt.secret"));
  return token;
});

const User = mongoose.model("User", userSchema);
module.exports = User;
