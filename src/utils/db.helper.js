const Summary = require("../db/summary");

function updateSummary(attr) {
  return async (doc, next) => {
    const filter = { user: doc.user };
    const update = { [attr]: doc._id };
    const updateOptions = { new: true, upsert: true };

    await Summary.findOneAndUpdate(filter, update, updateOptions);

    next();
  };
}

function makeNullInSummary(attr) {
  return async (doc, next) => {
    const filter = { user: doc.user };
    const update = { [attr]: null };
    const updateOptions = { new: true };

    await Summary.findOneAndUpdate(filter, update, updateOptions);

    next();
  };
}

module.exports = { updateSummary, makeNullInSummary };
