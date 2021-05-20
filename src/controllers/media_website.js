const validations = require("../utils/validations/media_website");
const schemaValidate = require("../utils/validations/validate");
const { Media_Website } = require("../db");
const baseService = require("../services/base_checklist")(
  Media_Website,
  "isMarketing"
);

async function fetchSingle(req, res) {
  const webDetail = await baseService.getSingle(req.user._id);
  res.send({ webDetail });
}

async function create(req, res) {
  const cleanFields = await schemaValidate(
    validations.mediaWebsiteSchema,
    req.body
  );
  const webDetail = await baseService.store(cleanFields, req.user._id);
  res.send({ webDetail });
}

async function update(req, res) {
  const cleanFields = await schemaValidate(
    validations.mediaWebsiteSchema,
    req.body
  );
  const webDetail = await baseService.update(
    cleanFields,
    req.params.id,
    req.user._id
  );
  res.send({ webDetail });
}

async function destroy(req, res) {
  await baseService.destroy(req.params.id, req.user._id);
  res.send({ message: "Successfully deleted the record" });
}

module.exports = { create, update, fetchSingle, destroy };
