let userRepo = require("../db")["account"];
var SHA256 = require("crypto-js/sha256");

module.exports = {
  getAccountByUsername(username) {
    return userRepo.findAll({
      include: [
        {
          model: db.location
        }
      ],
      where: {
        username
      }
    });
  },

  getAccountByEmail(email) {
    return userRepo.findAll({
      include: [
        {
          model: db.location
        }
      ],
      where: {
        email
      }
    });
  },

  addAccount(user) {
    return userRepo.create({ user });
  },

  updatePassword(username, password) {
    return userRepo.update({ password }, { where: { username } });
  },

  getAccountByUsernameAndPassword(username, password) {
    return userRepo.findAll({
      include: [
        {
          model: db.location
        }
      ],
      where: {
        username,
        password: SHA256(password)
      }
    });
  }
};
