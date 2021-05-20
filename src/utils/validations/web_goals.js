const yup = require("yup");

const webGoalSchema = yup.object().shape({
  objective: yup.string().required(),
  goal: yup.string().required(),
  callToAction: yup.string().required(),
  sitemap: yup.string().required(),
  advancedFeature: yup.string().required(),
});

module.exports = { webGoalSchema };
