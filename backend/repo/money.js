let userRepo = require("../db")["account"];
let SHA256 = require("crypto-js/sha256");
let db = require("../db");
let Op = db.Sequelize.Op;

module.exports = {
  getMoneyByUser(username, permiss) {
    return account.findAndCountAll({
      where: {
        username,
        isActived: {
          [Op.in]: permiss ? [true, false] : [true]
        }
      }
    });
  },
  addMoney(username, money, permiss) {
    return account.update(
      {
        money: +db.Sequelize.col("money") + money
      },
      {
        where: {
          username,
          isActived: {
            [Op.in]: permiss ? [true, false] : [true]
          }
        }
      }
    );
  },
  subMoney(username, money, permiss) {
    return account.update(
      {
        money: +db.Sequelize.col("money") + money
      },
      {
        where: {
          username,
          isActived: {
            [Op.in]: permiss ? [true, false] : [true]
          }
        }
      }
    );
  }
};
