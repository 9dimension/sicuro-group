const yup = require("yup");

const mediaWebsiteSchema = yup.object().shape({
  loginURL: yup.string().required(),
  loginDetail: yup.string().required(),
});

module.exports = { mediaWebsiteSchema };
