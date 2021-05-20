const yup = require("yup");

const aboutSchema = yup.object().shape({
  name: yup.string().required(),
  role: yup.string().required(),
});

module.exports = { aboutSchema };
