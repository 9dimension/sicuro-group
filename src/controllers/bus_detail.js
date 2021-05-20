const validations = require("../utils/validations/bus_detail");
const schemaValidate = require("../utils/validations/validate");
const { BusDetail } = require("../db");
const busDetailService = require("../services/base")(BusDetail);

async function fetchSingle(req, res) {
  const busDetail = await busDetailService.getSingle(req.user._id);
  res.send({ busDetail });
}

async function create(req, res) {
  const cleanFields = await schemaValidate(
    validations.busDetailSchema,
    req.body
  );
  const busDetail = await busDetailService.store(cleanFields, req.user._id);
  res.send({ busDetail });
}

async function update(req, res) {
  const cleanFields = await schemaValidate(
    validations.busDetailSchema,
    req.body
  );
  const busDetail = await busDetailService.update(cleanFields, req.params.id);
  res.send({ busDetail });
}

async function destroy(req, res) {
  await busDetailService.destroy(req.params.id);
  res.send({ message: "Successfully deleted the record" });
}

module.exports = { create, update, fetchSingle, destroy };
