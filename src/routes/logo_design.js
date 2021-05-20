const express = require("express");
const logoDesignController = require("../controllers/logo_design");

const router = express.Router();
router
  .post("/", logoDesignController.create)
  .get("/", logoDesignController.fetchSingle)
  .patch("/:id", logoDesignController.update)
  .delete("/:id", logoDesignController.destroy);

module.exports = router;
