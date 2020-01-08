let contract = require("../db")["contract"];
let db = require("../db");
let Op = db.Sequelize.Op;

module.exports = {
  getById(id, permiss = false) {
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
        id,
        isActived: {
          [Op.in]: permiss ? [true, false] : [true]
        },
        startDt: {
          [Op.ne]: null
        }
      }
    });
  },

  getByStatus(status, offset, limit) {
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
        status
      },
      offset,
      limit
    });
  },

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
              teacherId: user.username
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

  update(id, contractInfo, preStatus = null, permiss = false) {
    let whereClause = { id };
    if (preStatus) whereClause.status = preStatus;
    if (!permiss) whereClause.isActived = true;
    return contract.update(contractInfo, {
      where: whereClause
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
        startDt: {
          [Op.ne]: null
        },
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
          include: [{ model: db.account, include: [{ model: db.location }] }],
          where: {
            studentId
          }
        }
      ],
      where: {
        startDt: {
          [Op.ne]: null
        },
        id,
        isActived: {
          [Op.in]: permiss ? [true, false] : [true]
        }
      }
    });
  },

  getFinishedContractByTeacherId(teacherId, id) {
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
        startDt: {
          [Op.ne]: null
        },
        status: {
          [Op.in]: ["resolvedComplain", "finished"]
        },
        id,
        isActived: true
      }
    });
  }
};
