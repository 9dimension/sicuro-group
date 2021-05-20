const Exceptions = require("../utils/custom_exceptions");

class BaseService {
  Model = null;

  constructor(model) {
    this.Model = model;
  }

  async getSingle(userId) {
    return await this.Model.findOne({ user: userId }).select("-user");
  }

  async store(record, userId) {
    const busDetail = new this.Model({
      ...record,
      user: userId,
    });

    try {
      return await busDetail.save();
    } catch (err) {
      throw new Exceptions.BadRequset("You already created the record");
    }
  }

  async update(record, id) {
    try {
      const updatedRecord = await this.Model.findByIdAndUpdate(
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

  async destroy(id) {
    try {
      const recordInDb = await this.Model.findById(id);
      if (!recordInDb) throw new Error();
      await recordInDb.remove();
    } catch (err) {
      throw new Exceptions.NotFound("Record is not found you are requested ..");
    }
  }
}

function baseService(model) {
  return new BaseService(model);
}

exports.BaseService = BaseService;
module.exports = baseService;
