const mongoose = require("mongoose");
const { updateSummary, makeNullInSummary } = require("../utils/db.helper");

const schema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    unique: true,
  },
  name: String,
  role: String,
});

schema.post("save", updateSummary("about"));
schema.post("remove", makeNullInSummary("about"));

const About = mongoose.model("About", schema);
module.exports = About;
