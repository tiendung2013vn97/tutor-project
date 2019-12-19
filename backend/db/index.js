const Sequelize = require("sequelize");
const config = require("../config");
const db = {};

let sequelize = new Sequelize(
  config.db.database,
  config.db.username,
  config.db.password,
  {
    host: config.db.host,
    pool: config.db.pool,
    dialect: "mysql",
    logging: false
  }
);

let account = sequelize.import("account", require("../models/account"));
db[account.name] = account;

let location = sequelize.import("location", require("../models/location"));
db[location.name] = location;

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
