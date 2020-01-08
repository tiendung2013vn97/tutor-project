let skillTag = require("../db")["skill_tag"];
let db = require("../db");
const Op = db.Sequelize.Op;

module.exports = {
  adminGet(offset, limit) {
    return skillTag.findAndCountAll({
      offset,
      limit,
      raw: true
    });
  },

  get(permiss = false, offset, limit) {
    return skillTag.findAndCountAll({
      where: {
        isActived: {
          [Op.in]: permiss ? [true, false] : [true]
        }
      },
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

  getById(id, permiss) {
    return skillTag.findAll({
      where: {
        id,
        isActived: {
          [Op.in]: permiss ? [true, false] : [true]
        }
      }
    });
  }
};
