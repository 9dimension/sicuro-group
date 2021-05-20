const yup = require("yup");

const adOfferSchema = yup.object().shape({
  offerLocation: yup.string().required(),
  competitor: yup.string().required(),
  client: yup.string().required(),
  goal: yup.string().required(),
  targetMarket: yup.string().required(),
});

module.exports = { adOfferSchema };
