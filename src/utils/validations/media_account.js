const yup = require("yup");

const mediaAccountSchema = yup.object().shape({
  platform: yup.string().required(),
  facebookURL: yup.string().required(),
  access: yup.string().required(),
  accountId: yup.string().required(),
});

module.exports = { mediaAccountSchema };
