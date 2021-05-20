const yup = require("yup");

const busDetailSchema = yup.object().shape({
  introduction: yup.string().required(),
  sellingPoint: yup.string().required(),
  competitor: yup.string().required(),
  targetMarket: yup.string().required(),
  client: yup.string().required(),
});

module.exports = { busDetailSchema };
