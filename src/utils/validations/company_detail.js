const yup = require("yup");

const companyDetailSchema = yup.object().shape({
  busName: yup.string().required(),
  busEmail: yup.string().email().required(),
  busPhone: yup.string().required(),
  busAddress: yup.string().required(),
  webURL: yup.string().url().required(),
});

module.exports = { companyDetailSchema };
