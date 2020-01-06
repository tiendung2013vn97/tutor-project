let contract = require("../db")["contract"];
let db = require("../db");

module.exports = {
  getById(id, offset, limit) {
    return contract.findAll({
      include: [
        {
          model: db.skill,
          as: "skill",
          include: [{ model: db.account, include: [{ model: db.location }] }]
        }
      ],
      where: {
        id
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
    return contract.findAll({
      include: [
        {
          model: db.skill,
          as: "skill",
          include: [{ model: db.account, include: [{ model: db.location }] }]
        }
      ],
      offset,
      limit
    });
  }
};
