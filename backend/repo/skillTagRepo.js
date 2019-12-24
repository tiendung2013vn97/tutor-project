let skillTag = require("../db")["skill_tag"];
let db = require("../db");

module.exports = {
  getAll() {
    return skillTag.findAll({ where:{isActived:true},raw: true });
  },

  get(offset, limit) {
    return skillTag.findAll({ where:{isActived:true},offset, limit, raw: true });
  },

  getTop(limit){
    return skillTag.findAll({ where:{isActived:true},limit, raw: true,order:[["numUsed","desc"]] });
  }
};
