let userRepo = require("../db")["account"];

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

  addAccount(user) {
    let length = userRepo.length;
    userRepo.push(user);
    return userRepo.length - length;
  },

  getAccountByUsernameAndPassword(username, password) {
    return userRepo.filter(
      user => user.username === username && user.password === password
    );
  }
};
