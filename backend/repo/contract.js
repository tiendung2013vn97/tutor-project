let contract = require("../db")["contract"];
let db = require("../db");

module.exports = {
  getById(id, offset, limit) {
    return contract.findAll({
      where: {
        id
      },
      offset,
      limit
    });
  },

  getByStatus(status, offset, limit) {
    return contract.findAll({
      where: {
        status
      },
      offset,
      limit
    });
  },

  get(offset, limit) {
    return contract.findAndCountAll({
      offset,
      limit
    });
  }
};
