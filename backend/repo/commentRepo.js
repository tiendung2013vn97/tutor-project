let comment = require("../db")["comment"];
let db = require("../db");
let Sequelize = require("sequelize");
let Op = Sequelize.Op;

module.exports = {
  adminGet(contractId, offset, limit) {
    return comment.findAndCountAll({
      include: [
        {
          model: db.contract,
          required: true,
          include: [
            {
              model: db.skill,
              required: true,
              include: [
                {
                  model: db.account,
                  required: true,
                  attributes: { exclude: ["password"] }
                }
              ]
            }
          ]
        }
      ],
      where: {
        contractId
      },
      offset,
      limit
    });
  },

  get(username, contractId, offset, limit) {
    return comment.findAndCountAll({
      include: [
        {
          model: db.contract,
          required: true,
          include: [
            {
              model: db.skill,
              required: true,
              where: {
                [Op.or]: [
                  { ["$contract.studentId$"]: username },
                  { ["$contract.skill.teacherId$"]: "teacher1" }
                ]
              },
              include: [
                {
                  model: db.account,
                  required: true,
                  attributes: ["username"]
                }
              ]
            }
          ]
        }
      ],
      where: {
        contractId
      },
      offset,
      limit
    });
  }
};
