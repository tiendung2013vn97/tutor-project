let express = require("express");
let router = express.Router();
let commentRepo = require("../../repo/commentRepo");

router.get("/comments", (req, res) => {
  let get = async () => {
    try {
      let result = await commentRepo.get(
        req.user.username,
        req.query.contractId,
        +req.query.offset || 0,
        +req.query.limit || 1000000000
      );

      return res.json(result);
    } catch (err) {
      return res.status(400).send(err + "");
    }
  };
  get();
});

module.exports = router;
