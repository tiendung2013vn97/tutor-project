let userRepo = require("../db")["account"];
let SHA256 = require("crypto-js/sha256");
let db = require("../db");
let Op = db.Sequelize.Op;

module.exports = {
  getAccountByUsername(username) {
    return userRepo.findAll({
      include: [
        {
          model: db.location,
          required: true
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
          model: db.location,
          required: true
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
          model: db.location,
          required: true
        }
      ],
      where: {
        username,
        password: SHA256(password) + ""
      }
    });
  },

  getUser(isRoot, offset, limit) {
    let whereClause = {
      type: {
        [Op.in]: isRoot
          ? ["admin", "student", "teacher"]
          : ["student", "teacher"]
      }
    };
    return userRepo.findAndCountAll({
      include: [
        {
          model: db.location,
          required: true
        }
      ],
      where: whereClause,
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
    return userRepo.findAndCountAll({
      attributes: { exclude: ["password", "money"] },
      include: [
        {
          model: db.location,
          required: true,
          where: {
            [Op.and]: [locationId ? { id: locationId } : {}]
          }
        },
        {
          model: db.skill,
          as: "skills",
          required: true,
          include: [
            {
              model: db.skill_tag,
              where: {
                [Op.and]: [
                  skillTagId ? { id: skillTagId } : {},
                  { isActived: true }
                ]
              }
            }
          ],
          where: {
            [Op.and]: [costPerHour ? { costPerHour } : {}, { isActived: true }]
          }
        }
      ],
      where: { type: "teacher", isActived: true },
      offset,
      limit,
      subQuery: false,
      //   distinct: true,
      raw: true
      //   group: ["username"]
    });
  },

  update(username, info) {
    return userRepo.update(info, {
      where: {
        username,
        isActived: true
      }
    });
  },

  active(username) {
    return userRepo.update(
      {
        isActived: true
      },
      {
        where: {
          username
        }
      }
    );
  },

  deactive(username) {
    return userRepo.update(
      {
        isActived: false
      },
      {
        where: {
          username
        }
      }
    );
  },

  updatePassword(username, password) {
    return userRepo.update(
      {
        password: SHA256(password) + ""
      },
      {
        where: {
          username,
          isActived: true
        }
      }
    );
  }
};
