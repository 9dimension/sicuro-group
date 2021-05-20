const mongoose = require("mongoose");
const { updateSummary, makeNullInSummary } = require("../utils/db.helper");

const schema = new mongoose.Schema({
  service: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    unique: true,
  },
});

schema.post("save", updateSummary("adService"));
schema.post("remove", makeNullInSummary("adService"));

const Ad_Service = mongoose.model("Ad_Service", schema);
module.exports = Ad_Service;
