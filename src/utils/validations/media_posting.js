const yup = require("yup");

const mediaPostingSchema = yup.object().shape({
  posting: yup.string().required(),
  excludePostContent: yup.string().required(),
  webRefContent: yup.string().required(),
  feedback: yup.string().required(),
});

module.exports = { mediaPostingSchema };
