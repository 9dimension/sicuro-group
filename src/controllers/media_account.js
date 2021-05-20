const validations = require("../utils/validations/media_account");
const schemaValidate = require("../utils/validations/validate");
const { Media_Account } = require("../db");
const baseService = require("../services/base_checklist")(
  Media_Account,
  "isMarketing"
);

async function fetchSingle(req, res) {
  const account = await baseService.getSingle(req.user._id);
  res.send({ account });
}

async function create(req, res) {
  const cleanFields = await schemaValidate(
    validations.mediaAccountSchema,
    req.body
  );
  const account = await baseService.store(cleanFields, req.user._id);
  res.send({ account });
}

async function update(req, res) {
  const cleanFields = await schemaValidate(
    validations.mediaAccountSchema,
    req.body
  );
  const account = await baseService.update(
    cleanFields,
    req.params.id,
    req.user._id
  );
  res.send({ account });
}

async function destroy(req, res) {
  await baseService.destroy(req.params.id, req.user._id);
  res.send({ message: "Successfully deleted the record" });
}

module.exports = { create, update, fetchSingle, destroy };
