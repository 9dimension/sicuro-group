const BusDetail = require("../db/bus_detail");
const Exceptions = require("../utils/custom_exceptions");

async function getSingle(userId) {
  return await BusDetail.findOne({ user: userId }).select("-user");
}

async function store(record, userId) {
  const busDetail = new BusDetail({
    ...record,
    user: userId,
  });

  try {
    return await busDetail.save();
  } catch (err) {
    throw new Exceptions.BadRequset("You already created the record");
  }
}

async function update(record, id) {
  try {
    const updatedRecord = await BusDetail.findByIdAndUpdate(
      id,
      { $set: { ...record } },
      { new: true }
    ).select("-user");

    if (updatedRecord) return updatedRecord;

    throw new Error();
  } catch (err) {
    throw new Exceptions.NotFound("Record is not found you are requested ..");
  }
}

async function destroy(id) {
  try {
    const recordInDb = await BusDetail.findById(id);
    if (!recordInDb) throw new Error();
    await recordInDb.remove();
  } catch (err) {
    throw new Exceptions.NotFound("Record is not found you are requested ..");
  }
}

module.exports = { store, update, getSingle, destroy };
