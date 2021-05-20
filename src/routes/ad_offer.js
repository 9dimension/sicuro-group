const express = require("express");
const adOffercontroller = require("../controllers/ad_offer");

const router = express.Router();
router
  .post("/", adOffercontroller.create)
  .get("/", adOffercontroller.fetchSingle)
  .patch("/:id", adOffercontroller.update)
  .delete("/:id", adOffercontroller.destroy);

module.exports = router;
