const validations = require("../utils/validations/checklist");
const schemaValidate = require("../utils/validations/validate");
const { CheckList } = require("../db");
const baseService = require("../services/base")(CheckList);

async function fetchSingle(req, res) {
  const checklist = await baseService.getSingle(req.user._id);
  res.send({  checklist });
}

async function create(req, res) {
  const cleanFields = await schemaValidate(
    validations.checklistSchema,
    req.body
  );
  const checklist = await baseService.store(cleanFields, req.user._id);
  res.send({ checklist });
}

async function update(req, res) {
  const cleanFields = await schemaValidate(
    validations.checklistSchema,
    req.body
  );
  const checklist = await baseService.update(cleanFields, req.params.id);
  res.send({ checklist });
}

async function destroy(req, res) {
  await baseService.destroy(req.params.id);
  res.send({ message: "Successfully deleted the record" });
}

module.exports = { create, update, fetchSingle, destroy };
