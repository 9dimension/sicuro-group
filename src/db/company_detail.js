const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  logo: String,
  busName: String,
  busEmail: String,
  busPhone: String,
  busAddress: String,
  webURL: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    unique: true,
  },
});

const CompanyDetail = mongoose.model("CompanyDetail", schema);
module.exports = CompanyDetail;
