const mongoose = require("mongoose");
const { updateSummary, makeNullInSummary } = require("../utils/db.helper");

const schema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    unique: true,
  },
  offerLocation: String,
  competitor: String,
  client: String,
  goal: String,
  targetMarket: String,
});

schema.post("save", updateSummary("adOffer"));
schema.post("remove", makeNullInSummary("adOffer"));

const Ad_Offer = mongoose.model("Ad_Offer", schema);
module.exports = Ad_Offer;
