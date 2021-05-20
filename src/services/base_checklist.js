const { CheckList } = require("../db");
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

class BaseServiceWithChecklist extends BaseService {
  serviceEnroll = "isWebDev";

  constructor(model, serviceEnroll) {
    super(model);
    this.serviceEnroll = serviceEnroll ?? this.serviceEnroll;
  }

  async throwExIfServiceNotFoundInCheckList(userId) {
    const checklist = await CheckList.findOne({
      user: userId,
      [this.serviceEnroll]: true,
    });

    if (!checklist)
      throw new Exceptions.BadRequset(
        `You are not enrolled ther service ${this.serviceEnroll}`
      );
  }

  async getSingle(userId) {
    await this.throwExIfServiceNotFoundInCheckList(userId);
    return await super.getSingle(userId);
  }

  async store(record, userId) {
    await this.throwExIfServiceNotFoundInCheckList(userId);
    return await super.store(record, userId);
  }

  async update(record, id, userId) {
    await this.throwExIfServiceNotFoundInCheckList(userId);
    return await super.update(record, id);
  }

  async destroy(id, userId) {
    await this.throwExIfServiceNotFoundInCheckList(userId);
    return await super.destroy(id);
  }
}

function baseService(model, serviceEnroll) {
  return new BaseServiceWithChecklist(model, serviceEnroll);
}

exports.BaseServiceWithChecklist = BaseServiceWithChecklist;
module.exports = baseService;
