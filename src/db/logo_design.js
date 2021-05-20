const mongoose = require("mongoose");
const { updateSummary, makeNullInSummary } = require("../utils/db.helper");

const schema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    unique: true,
  },
  text: String,
  tagline: String,
  color: String,
  style: String,
});

schema.post("save", updateSummary("logoDesign"));
schema.post("remove", makeNullInSummary("logoDesign"));

const LogoDesign = mongoose.model("LogoDesign", schema);
module.exports = LogoDesign;
