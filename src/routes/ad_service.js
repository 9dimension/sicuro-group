const express = require("express");
const adServiceController = require("../controllers/ad_service");

const router = express.Router();
router
  .post("/", adServiceController.create)
  .get("/", adServiceController.fetchSingle)
  .patch("/:id", adServiceController.update)
  .delete("/:id", adServiceController.destroy);

module.exports = router;
