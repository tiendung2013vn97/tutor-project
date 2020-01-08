let contract = require("../db")["contract"];
let db = require("../db");
let Op = db.Sequelize.Op;

module.exports = {
  get(permiss = false, offset, limit) {
    return contract.findAndCountAll({
      include: [
        {
          model: db.skill,
          as: "skill",
          required: true,
          include: [{ model: db.account, include: [{ model: db.location }] }]
        }
      ],
      where: {
        startDt:null,
        isActived: {
          [Op.in]: permiss ? [true, false] : [true]
        }
      },
      offset,
      limit
    });
  },

  create(skillId, studentId) {
    let createDt = new Date().getTime();
    return contract.create({
      skillId,
      studentId,
      createDt
    });
  },

  update(id, contractInfo) {
    return contract.update(contractInfo, {
        include:[{
            model:db.skill,
            where:{teacherId:contractInfo.teacherId}
        }],

      where: { id }
    });
  },

  deactive(id) {
    return contract.update(
      { isActived: false },
      {
        where: { id }
      }
    );
  },

  active(id) {
    return contract.update(
      { isActived: true },
      {
        where: { id }
      }
    );
  }
};
