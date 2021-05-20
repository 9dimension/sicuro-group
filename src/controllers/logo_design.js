const validations = require("../utils/validations/logo_design");
const schemaValidate = require("../utils/validations/validate");
const { LogoDesign } = require("../db");
const baseService = require("../services/base_checklist")(
  LogoDesign,
  "isLogoCreation"
);

async function fetchSingle(req, res) {
  const logoDesign = await baseService.getSingle(req.user._id);
  res.send({ logoDesign });
}

async function create(req, res) {
  const cleanFields = await schemaValidate(
    validations.logoDesignSchema,
    req.body
  );
  const logoDesign = await baseService.store(cleanFields, req.user._id);
  res.send({ logoDesign });
}

async function update(req, res) {
  const cleanFields = await schemaValidate(
    validations.logoDesignSchema,
    req.body
  );
  const logoDesign = await baseService.update(
    cleanFields,
    req.params.id,
    req.user._id
  );
  res.send({ logoDesign });
}

async function destroy(req, res) {
  await baseService.destroy(req.params.id, req.user._id);
  res.send({ message: "Successfully deleted the record" });
}

module.exports = { create, update, fetchSingle, destroy };
