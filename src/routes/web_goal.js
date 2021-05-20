const express = require("express");
const webGoalController = require("../controllers/web_goal");

const router = express.Router();
router
  .post("/", webGoalController.create)
  .get("/", webGoalController.fetchSingle)
  .patch("/:id", webGoalController.update)
  .delete("/:id", webGoalController.destroy);

module.exports = router;
