const yup = require("yup");

const logoDesignSchema = yup.object().shape({
  text: yup.string().required(),
  tagline: yup.string().required(),
  color: yup.string().required(),
  style: yup.string().required(),
});

module.exports = { logoDesignSchema };
