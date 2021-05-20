const validations = require("../utils/validations/ad_offer");
const schemaValidate = require("../utils/validations/validate");
const { Ad_Offer } = require("../db");
const baseService = require("../services/base_checklist")(Ad_Offer, "isPaidAd");

async function fetchSingle(req, res) {
  const adOffer = await baseService.getSingle(req.user._id);
  res.send({ adOffer });
}

async function create(req, res) {
  const cleanFields = await schemaValidate(validations.adOfferSchema, req.body);
  const adOffer = await baseService.store(cleanFields, req.user._id);
  res.send({ adOffer });
}

async function update(req, res) {
  const cleanFields = await schemaValidate(validations.adOfferSchema, req.body);
  const adOffer = await baseService.update(
    cleanFields,
    req.params.id,
    req.user._id
  );
  res.send({ adOffer });
}

async function destroy(req, res) {
  await baseService.destroy(req.params.id, req.user._id);
  res.send({ message: "Successfully deleted the record" });
}

module.exports = { create, update, fetchSingle, destroy };
