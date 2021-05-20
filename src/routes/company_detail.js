const express = require("express");
const companyDetailController = require("../controllers/company-detail");
const uploads = require("../middlewares/uploads");

const router = express.Router();
router
  .post("/", uploads.single("logo"), companyDetailController.create)
  .get("/", companyDetailController.fetchSingle)
  .patch("/:id", uploads.single("logo"), companyDetailController.update)
  .delete("/:id", companyDetailController.destroy);

module.exports = router;
