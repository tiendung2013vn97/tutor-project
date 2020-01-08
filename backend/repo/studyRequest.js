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
        startDt: null,
        isActived: {
          [Op.in]: permiss ? [true, false] : [true]
        }
      },
      offset,
      limit
    });
  },

  getByTeacherId(teacherId, id, permiss = false) {
    return contract.findAll({
      include: [
        {
          model: db.skill,
          as: "skill",
          required: true,
          include: [{ model: db.account, include: [{ model: db.location }] }],
          where: {
            teacherId
          }
        }
      ],
      where: {
        startDt: null,
        id,
        isActived: {
          [Op.in]: permiss ? [true, false] : [true]
        }
      }
    });
  },

  getByStudentId(studentId, id, permiss = false) {
    return contract.findAll({
      include: [
        {
          model: db.skill,
          as: "skill",
          required: true,
          include: [{ model: db.account, include: [{ model: db.location }] }]
        }
      ],
      where: {
        startDt: null,
        studentId,
        id,
        isActived: {
          [Op.in]: permiss ? [true, false] : [true]
        }
      }
    });
  },

  create(contractInfo) {
    contractInfo.createDt = new Date().getTime();
    contractInfo.status = "waitingTeacher";
    return contract.create(contractInfo);
  },

  update(id, contractInfo, preStatus) {
    return contract.update(contractInfo, {
      where: { id, status: preStatus, isActived: true }
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
