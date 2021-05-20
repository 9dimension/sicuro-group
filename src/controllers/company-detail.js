const validations = require("../utils/validations/company_detail");
const schemaValidate = require("../utils/validations/validate");
const { CompanyDetail } = require("../db");
const busDetailService = require("../services/base")(CompanyDetail);

async function fetchSingle(req, res) {
  const about = await busDetailService.getSingle(req.user._id);
  res.send({ about });
}

async function create(req, res) {
  console.log("files", req.file);

  const cleanFields = await schemaValidate(
    validations.companyDetailSchema,
    req.body
  );
  const companyDetail = await busDetailService.store(
    { ...cleanFields, logo: req.file ? req.file.path : null },
    req.user._id
  );
  res.send({ companyDetail });
}

async function update(req, res) {
  const cleanFields = await schemaValidate(
    validations.companyDetailSchema,
    req.body
  );

  let fields = cleanFields;
  if (req.file) {
    fields.logo = req.file.path;
  }

  const companyDetail = await busDetailService.update(
    { ...fields },
    req.params.id
  );
  res.send({ companyDetail });
}

async function destroy(req, res) {
  await busDetailService.destroy(req.params.id);
  res.send({ message: "Successfully deleted the record" });
}

module.exports = { create, fetchSingle, update, destroy };
