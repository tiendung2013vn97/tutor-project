let comment = require("../db")["comment"];
let db = require("../db");

module.exports = {
  get(contractId, offset, limit) {
    return comment.findAll({
      include: [
        {
          model: db.contract,
          required: true,
          include: [{ model: db.contract }],
          where: {
            contractId
          }
        }
      ],
      offset,
      limit
    });
  }
};
