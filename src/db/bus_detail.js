const mongoose = require("mongoose");
const { updateSummary, makeNullInSummary } = require("../utils/db.helper");

const schema = new mongoose.Schema({
  introduction: String,
  sellingPoint: String,
  competitor: String,
  targetMarket: String,
  client: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    unique: true,
  },
});

schema.post("save", updateSummary("busDetail"));
schema.post("remove", makeNullInSummary("busDetail"));

const BusDetail = mongoose.model("BusDetail", schema);
module.exports = BusDetail;
