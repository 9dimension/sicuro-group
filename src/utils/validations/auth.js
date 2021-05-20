const yup = require("yup");

const registerSchema = yup.object().shape({
  name: yup.string().min(5).max(30).required(),
  company: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().min(8).max(30).required(),
});

const loginSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(8).max(30).required(),
});

module.exports = {
  registerSchema,
  loginSchema,
};
