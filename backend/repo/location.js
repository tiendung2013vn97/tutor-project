let location = require("../db")["location"];
let db = require("../db");

module.exports = {
  getLocation() {
    return location.findAll({ raw: true });
  }
};
