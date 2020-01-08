let contract = require("../db")["contract"];
let db = require("../db");
let Op = db.Sequelize.Op;

module.exports = {
  get(user, offset, limit) {
    let opt = {
      include: [
        {
          model: db.skill,
          as: "skill",
          required: true,
          include: [{ model: db.account, include: [{ model: db.location }] }]
        }
      ],
      where: {
        startDt: null
      },
      offset,
      limit
    };
    if (user.type === "student") {
      opt = {
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
          studentId: user.username,
          isActived: true
        },
        offset,
        limit
      };
    }

    if (user.type === "teacher") {
      opt = {
        include: [
          {
            model: db.skill,
            as: "skill",
            required: true,
            include: [{ model: db.account, include: [{ model: db.location }] }],
            where: {
              teacherId: user.username,
              startDt: null
            }
          }
        ],
        where: {
          isActived: true
        },
        distinct: true,
        offset,
        limit
      };
    }

    return contract.findAndCountAll(opt);
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
    if (preStatus) {
      let whereClause = { id, status: preStatus, isActived: true };
    } else {
      let whereClause = { id, isActived: true };
    }
    return contract.update(contractInfo, {
      where: whereClause
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
