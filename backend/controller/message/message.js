let express = require("express");
let router = express.Router();
let messageRepo = require("../../repo/message");
const config = require("../../config");

router.get("/", (req, res) => {
  let get = async () => {
    try {
      if (!req.query.contractId) {
        return res.json({
          status: "fail",
          code: "MISSING_PARAM",
          msg: "Thiếu tham số contractId"
        });
      }
      let result = await messageRepo.get(
        req.query.contractId,
        +req.query.offset || 0,
        +req.query.limit || config.maxCount
      );
      result = result.map(item => item.get({ plain: true }));
      return res.json(result);
    } catch (err) {
      return res.json({
        status: "fail",
        msg: err + ""
      });
    }
  };
  get();
});

module.exports = router;
