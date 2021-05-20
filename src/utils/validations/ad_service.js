const yup = require("yup");

const adServiceSchema = yup.object().shape({
  service: yup.string().required(),
});

module.exports = { adServiceSchema };
