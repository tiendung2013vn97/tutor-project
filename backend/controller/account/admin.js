let express = require("express");
let router = express.Router();
let accountRepo = require("../../repo/accountRepo");
let skillTagRepo = require("../../repo/skillTagRepo");
let commentRepo = require("../../repo/commentRepo");

router.get("/users", (req, res) => {
  let get = async () => {
    try {
      let result = await accountRepo.getUser(
        +req.query.offset || 0,
        +req.query.limit || 1000000000
      );

      result.rows = result.rows.map(item => {
        let res = item.get({ plain: true });
        delete res.password;
        return res;
      });
      return res.json(result);
    } catch (err) {
      return res.status(400).send(err + "");
    }
  };
  get();
});

router.get("/skill-tags", (req, res) => {
  let get = async () => {
    try {
      let result = await skillTagRepo.adminGet(
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

router.get("/comments", (req, res) => {
  let get = async () => {
    try {
      let result = await commentRepo.adminGet(
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
