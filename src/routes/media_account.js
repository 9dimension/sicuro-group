const express = require("express");
const mediaAccountController = require("../controllers/media_account");

const router = express.Router();
router
  .post("/", mediaAccountController.create)
  .get("/", mediaAccountController.fetchSingle)
  .patch("/:id", mediaAccountController.update)
  .delete("/:id", mediaAccountController.destroy);

module.exports = router;
