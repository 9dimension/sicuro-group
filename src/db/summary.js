const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    unique: true,
  },
  busDetail: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "BusDetail",
  },
  webGoal: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "WebGoal",
  },
  adService: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Ad_Service",
  },
  adOffer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Ad_Offer",
  },
  mediaPost: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Media_Post",
  },
  mediaAccount: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Media_Account",
  },
  mediaWebsite: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Media_Website",
  },
  logoDesign: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "LogoDesign",
  },
  about: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "About",
  }
});

const Summary = mongoose.model("Summary", schema);
module.exports = Summary;
