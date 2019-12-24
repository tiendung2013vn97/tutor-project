const Sequelize = require("sequelize");
const config = require("../config");
const db = {};

let sequelize = new Sequelize(
  config.db.database,
  config.db.username,
  config.db.password,
  {
    host: config.db.host,
    port: config.db.port,
    pool: config.db.pool,
    dialect: "mysql",
    logging: false
  }
);

let account = sequelize.import("account", require("../models/account"));
db[account.name] = account;

let location = sequelize.import("location", require("../models/location"));
db[location.name] = location;

let skillTag = sequelize.import("skill_tag", require("../models/skillTag"));
db[skillTag.name] = skillTag;

let comment = sequelize.import("comment", require("../models/comment"));
db[comment.name] = comment;

let contract = sequelize.import("contract", require("../models/contract"));
db[contract.name] = contract;

let session = sequelize.import("session", require("../models/session"));
db[session.name] = session;

let skill = sequelize.import("skill", require("../models/skill"));
db[skill.name] = skill;

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
