let skill = require("../db")["skill"];
let db = require("../db");

module.exports = {
  get(offset, limit) {
    return skill.findAndCountAll({
      include: [
        {
          attributes: { exclude: ["password", "money"] },
          model: db.account,
          required: true
        },
        {
          model: db.skill_tag,
          required: true
        }
      ],
      where: {
        isActived: true
      },
      offset,
      limit
    });
  },

  getByTeacher(teacherId, offset, limit) {
    return skill.findAndCountAll({
      include: [
        {
          attributes: { exclude: ["password", "money"] },
          model: db.account,
          required: true,
          where: {
            username: teacherId,
            isActived: true
          }
        },
        {
          model: db.skill_tag,
          required: true
        }
      ],
      where: {
        isActived: true
      },
      offset,
      limit,
      distinct: true
    });
  }
};
