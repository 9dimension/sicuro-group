const express = require("express");
const mediaPostingController = require("../controllers/media_posting");

const router = express.Router();
router
  .post("/", mediaPostingController.create)
  .get("/", mediaPostingController.fetchSingle)
  .patch("/:id", mediaPostingController.update)
  .delete("/:id", mediaPostingController.destroy);

module.exports = router;
