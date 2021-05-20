const express = require("express");
require("express-async-errors");
const cors = require("cors");
const bodyParser = require("body-parser");
const apiRoutes = require("./src/routes");
const catchExceptions = require("./src/middlewares/exception_handling");

const app = express();
app.use(cors({ origin: "http://localhost:3000" }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", apiRoutes);
app.use(catchExceptions);

module.exports = app;
