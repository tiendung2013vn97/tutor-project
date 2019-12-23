let skillTag = require("../db")["skill_tag"];
let db = require("../db");

module.exports = {
  getAll() {
    return skillTag.findAll({ raw: true });
  },

  get(offset, limit) {
    return skillTag.findAll({ offset, limit, raw: true });
  }
};
