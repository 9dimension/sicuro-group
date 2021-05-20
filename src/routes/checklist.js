const express = require("express");
const checklistController = require("../controllers/checklist");

const router = express.Router();
router
  .post("/", checklistController.create)
  .get("/", checklistController.fetchSingle)
  .patch("/:id", checklistController.update)
  .delete("/:id", checklistController.destroy);

module.exports = router;
