const express = require("express");
const busDetailController = require("../controllers/bus_detail");

const router = express.Router();
router
  .post("/", busDetailController.create)
  .patch("/:id", busDetailController.update)
  .get("/", busDetailController.fetchSingle)
  .delete("/:id", busDetailController.destroy);

module.exports = router;
