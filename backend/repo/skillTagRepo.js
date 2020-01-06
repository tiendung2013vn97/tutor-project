let skillTag = require("../db")["skill_tag"];
let db = require("../db");

module.exports = {
  adminGet(offset, limit) {
    return skillTag.findAndCountAll({
      offset,
      limit,
      raw: true
    });
  },

  get(offset, limit) {
    return skillTag.findAndCountAll({
      where: { isActived: true },
      offset,
      limit,
      raw: true
    });
  },

  getTop(limit) {
    return skillTag.findAll({
      where: { isActived: true },
      limit,
      raw: true,
      order: [["numUsed", "desc"]]
    });
  },

  update(id, skillTagInfo) {
    return skillTag.update(skillTagInfo, { where: { id } });
  },

  add(skillTagInfo) {
    return skillTag.create(skillTagInfo);
  },

  getById(id, offset, limit) {
    return skillTag.findAll({
      where: {
        id
      },
      offset,
      limit
    });
  },
};
