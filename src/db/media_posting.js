const mongoose = require("mongoose");
const { updateSummary, makeNullInSummary } = require("../utils/db.helper");

const schema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    unique: true,
  },
  posting: String,
  excludePostContent: String,
  webRefContent: String,
  feedback: String,
});

schema.post("save", updateSummary("mediaPost"));
schema.post("remove", makeNullInSummary("mediaPost"));

const Media_Post = mongoose.model("Media_Post", schema);
module.exports = Media_Post;
