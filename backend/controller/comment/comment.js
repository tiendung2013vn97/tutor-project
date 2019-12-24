let express = require("express");
let router = express.Router();
let commentRepo = require("../../repo/comment");

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
      let result = await commentRepo.get(
        req.query.contractId,
        +req.query.offset || 0,
        +req.query.limit || 1000000000
      );
      result = result.map(item => item.get({ plain: true }));
      return res.json(result);
    } catch (err) {
      return res.status(400).send(err + "");
    }
  };
  get();
});

module.exports = router;
