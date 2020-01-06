let userRepo = require("../db")["account"];
let SHA256 = require("crypto-js/sha256");
let db = require("../db");
let Op = db.Sequelize.Op;

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
    return userRepo.create(user);
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
        password: SHA256(password) + ""
      }
    });
  },

  getUser(offset, limit) {
    return userRepo.findAndCountAll({
      include: [
        {
          model: db.location
        }
      ],
      offset,
      limit
    });
  },

  updateStatus(username) {
    return userRepo.findOne({ where: { username } }).then(user => {
      userRepo.update({ isActived: !user.isActived }, { where: { username } });
    });
    // return userRepo.update({isActived: this.isActived === 1 ? 0 : 1}, {where: {username}})
  },

  filterTeacher(locationId, skillTagId, costPerHour, offset, limit) {
    return userRepo.findAll({
      attributes: { exclude: ["password"] },
      include: [
        {
          model: db.location,
          where: {
            [Op.and]: [locationId ? { id: locationId } : {}]
          }
        },
        {
          model: db.skill,
          as: "skills",
          //   include: [
          //     {
          //       model: db.skill_tag,
          //       where: {
          //         [Op.and]: [skillTagId ? { id: skillTagId } : {}]
          //       }
          //     }
          //   ],
          where: {
            [Op.and]: [costPerHour ? { costPerHour } : {}]
          }
        }
      ],
      where: { type: "teacher", isActived: true },
      offset,
      limit
    });
  }
};
