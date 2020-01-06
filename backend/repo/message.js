let message = require("../db")["message"];
let db = require("../db");

module.exports = {
  get(contractId, offset, limit) {
    return message.findAll({
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
