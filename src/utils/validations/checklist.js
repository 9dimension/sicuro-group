const yup = require("yup");

const checklistSchema = yup.object().shape({
  isWebDev: yup.bool().notRequired(),
  isPaidAd: yup.bool().notRequired(),
  isMarketing: yup.bool().notRequired(),
  isLogoCreation: yup.bool().notRequired(),
});

module.exports = { checklistSchema };
