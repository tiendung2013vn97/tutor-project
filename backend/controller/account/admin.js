let express = require("express");
let router = express.Router();
let accountRepo = require("../../repo/account");
let skillTagRepo = require("../../repo/skillTag");
const config = require("../../config");

router.get("/users", (req, res) => {
  let get = async () => {
    try {
      let result = await accountRepo.getUser(
        +req.query.offset || 0,
        +req.query.limit || config.maxCount
      );

      result.rows = result.rows.map(item => {
        let res = item.get({ plain: true });
        delete res.password;
        return res;
      });
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

router.get("/skill-tags", (req, res) => {
  let get = async () => {
    try {
      let result = await skillTagRepo.adminGet(
        +req.query.offset || 0,
        +req.query.limit || config.maxCount
      );

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

router.get("/users/change-status", (req, res) => {
  let get = async () => {
    try {
      let result = await accountRepo.updateStatus(req.query.username);
      return res.json(result);
    } catch (e) {
      return res.json({
        status: "fail",
        msg: err + ""
      });
    }
  };
  get();
});

router.get("/skill-tags/change-status", (req, res) => {
  let get = async () => {
    try {
      let result = await skillTagRepo.updateStatus(req.query.id);
      return res.json(result);
    } catch (e) {
      return res.json({
        status: "fail",
        msg: err + ""
      });
    }
  };
  get();
});
module.exports = router;
