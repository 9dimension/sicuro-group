const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    unique: true,
  },
  isWebDev: { type: Boolean, default: false },
  isPaidAd: { type: Boolean, default: false },
  isMarketing: { type: Boolean, default: false },
  isLogoCreation: { type: Boolean, default: false },
});

const CheckList = mongoose.model("CheckList", schema);
module.exports = CheckList;
