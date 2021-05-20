const validations = require("../utils/validations/media_posting");
const schemaValidate = require("../utils/validations/validate");
const { Media_Post } = require("../db");
const baseService = require("../services/base_checklist")(
  Media_Post,
  "isMarketing"
);

async function fetchSingle(req, res) {
  const post = await baseService.getSingle(req.user._id);
  res.send({ post });
}

async function create(req, res) {
  const cleanFields = await schemaValidate(
    validations.mediaPostingSchema,
    req.body
  );
  const post = await baseService.store(cleanFields, req.user._id);
  res.send({ post });
}

async function update(req, res) {
  const cleanFields = await schemaValidate(
    validations.mediaPostingSchema,
    req.body
  );
  const post = await baseService.update(
    cleanFields,
    req.params.id,
    req.user._id
  );
  res.send({ post });
}

async function destroy(req, res) {
  await baseService.destroy(req.params.id, req.user._id);
  res.send({ message: "Successfully deleted the record" });
}

module.exports = { create, update, fetchSingle, destroy };
