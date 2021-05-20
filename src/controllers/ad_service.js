const validations = require("../utils/validations/ad_service");
const schemaValidate = require("../utils/validations/validate");
const { Ad_Service } = require("../db");
const baseService = require("../services/base_checklist")(
  Ad_Service,
  "isPaidAd"
);

async function fetchSingle(req, res) {
  const adService = await baseService.getSingle(req.user._id);
  res.send({ adService });
}

async function create(req, res) {
  const cleanFields = await schemaValidate(
    validations.adServiceSchema,
    req.body
  );
  const adService = await baseService.store(cleanFields, req.user._id);
  res.send({ adService });
}

async function update(req, res) {
  const cleanFields = await schemaValidate(
    validations.adServiceSchema,
    req.body
  );
  const adService = await baseService.update(
    cleanFields,
    req.params.id,
    req.user._id
  );
  res.send({ adService });
}

async function destroy(req, res) {
  await baseService.destroy(req.params.id, req.user._id);
  res.send({ message: "Successfully deleted the record" });
}

module.exports = { create, update, fetchSingle, destroy };
