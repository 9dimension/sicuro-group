const mongoose = require("mongoose");
const { updateSummary, makeNullInSummary } = require("../utils/db.helper");

const schema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    unique: true,
  },
  loginURL: String,
  loginDetail: String,
});

schema.post("save", updateSummary("mediaWebsite"));
schema.post("remove", makeNullInSummary("mediaWebsite"));

const Media_Website = mongoose.model("Media_Website", schema);
module.exports = Media_Website;
