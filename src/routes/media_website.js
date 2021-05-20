const express = require("express");
const mediaWebController = require("../controllers/media_website");

const router = express.Router();
router
  .post("/", mediaWebController.create)
  .get("/", mediaWebController.fetchSingle)
  .patch("/:id", mediaWebController.update)
  .delete("/:id", mediaWebController.destroy);

module.exports = router;
