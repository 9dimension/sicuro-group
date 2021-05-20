const express = require("express");
const aboutController = require("../controllers/about");

const router = express.Router();
router
  .post("/", aboutController.create)
  .patch("/:id", aboutController.update)
  .get("/", aboutController.fetchSingle)
  .delete("/:id", aboutController.destroy);

module.exports = router;
