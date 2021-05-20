const mongoose = require("mongoose");
const { updateSummary, makeNullInSummary } = require("../utils/db.helper");

const schema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    unique: true,
  },
  objective: String,
  goal: String,
  callToAction: String,
  sitemap: String,
  advancedFeature: String,
});

schema.post("save", updateSummary("webGoal"));
schema.post("remove", makeNullInSummary("webGoal"));

const WebGoal = mongoose.model("WebGoal", schema);
module.exports = WebGoal;
