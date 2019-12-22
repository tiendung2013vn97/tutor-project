let userRepo = require("../db")["account"];
let db = require("../db");

module.exports = {
  getLocation() {
    return db.findAll({ raw: true });
  }
};
