const validations = require("../utils/validations/about");
const schemaValidate = require("../utils/validations/validate");
const { About } = require("../db");
const busDetailService = require("../services/base")(About);

async function fetchSingle(req, res) {
  const about = await busDetailService.getSingle(req.user._id);
  res.send({ about });
}

async function create(req, res) {
  const cleanFields = await schemaValidate(validations.aboutSchema, req.body);
  const about = await busDetailService.store(cleanFields, req.user._id);
  res.send({ about });
}

async function update(req, res) {
  const cleanFields = await schemaValidate(validations.aboutSchema, req.body);
  const about = await busDetailService.update(cleanFields, req.params.id);
  res.send({ about });
}

async function destroy(req, res) {
  await busDetailService.destroy(req.params.id);
  res.send({ message: "Successfully deleted the record" });
}

module.exports = { create, update, fetchSingle, destroy };
