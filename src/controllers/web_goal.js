const validations = require("../utils/validations/web_goals");
const schemaValidate = require("../utils/validations/validate");
const { WebGoal } = require("../db");
const baseService = require("../services/base_checklist")(WebGoal, "isWebDev");

async function fetchSingle(req, res) {
  const webGoal = await baseService.getSingle(req.user._id);
  res.send({ webGoal });
}

async function create(req, res) {
  const cleanFields = await schemaValidate(validations.webGoalSchema, req.body);
  const webGoal = await baseService.store(cleanFields, req.user._id);
  res.send({ webGoal });
}

async function update(req, res) {
  const cleanFields = await schemaValidate(validations.webGoalSchema, req.body);
  const webGoal = await baseService.update(
    cleanFields,
    req.params.id,
    req.user._id
  );
  res.send({ webGoal });
}

async function destroy(req, res) {
  await baseService.destroy(req.params.id, req.user._id);
  res.send({ message: "Successfully deleted the record" });
}

module.exports = { create, update, fetchSingle, destroy };
