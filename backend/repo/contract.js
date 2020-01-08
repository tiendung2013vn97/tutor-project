let contract = require("../db")["contract"];
let db = require("../db");
let Op=db.Sequelize.Op

module.exports = {
  getById(id, permiss = false, offset, limit) {
    return contract.findAll({
      include: [
        {
          model: db.skill,
          as: "skill",
          required: true,
          include: [{ model: db.account, include: [{ model: db.location }] }]
        }
      ],
      where: {
        id,
        isActived: {
          [Op.in]: permiss ? [true, false] : [true]
        },
        startDt:{
          [Op.ne]:null
        }
      },
      offset,
      limit
    });
  },

  getByStatus(status, offset, limit) {
    return contract.findAll({
      include: [
        {
          model: db.skill,
          as: "skill",
          required: true,
          include: [{ model: db.account, include: [{ model: db.location }] }]
        }
      ],
      where: {
        status
      },
      offset,
      limit
    });
  },

  get(offset, limit) {
    return contract.findAndCountAll({
      include: [
        {
          model: db.skill,
          as: "skill",
          required: true,
          include: [{ model: db.account, include: [{ model: db.location }] }]
        }
      ],
      offset,
      limit
    });
  }
};
