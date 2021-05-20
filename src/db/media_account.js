const mongoose = require("mongoose");
const { updateSummary, makeNullInSummary } = require("../utils/db.helper");

const schema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    unique: true,
  },
  platform: String,
  facebookURL: String,
  access: String,
  accountId: String,
});

schema.post("save", updateSummary("mediaAccount"));
schema.post("remove", makeNullInSummary("mediaAccount"));

const Media_Account = mongoose.model("Media_Account", schema);
module.exports = Media_Account;
