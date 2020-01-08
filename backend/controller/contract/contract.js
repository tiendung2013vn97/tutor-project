let express = require("express");
let router = express.Router();
let contractRepo = require("../../repo/contract");
const config = require("../../config");

router.get("/", (req, res) => {
  let get = async () => {
    try {
      let result = await contractRepo.get(
        +req.query.offset || 0,
        +req.query.limit || config.maxCount
      );
      // result.rows = result.rows.map(item => item.get({ plain: true }));
      return res.json(result);
    } catch (err) {
      return res.status(400).send(err + "");
    }
  };
  get();
});

router.get("/by-id/:id", (req, res) => {
  let get = async () => {
    try {
      let result = await contractRepo.getById(
        req.params.id,
        req.permiss,
        +req.query.offset || 0,
        +req.query.limit || config.maxCount
      );
      // result.rows = result.rows.map(item => item.get({ plain: true }));
      return res.json(result[0]);
    } catch (err) {
      return res.status(400).send(err + "");
    }
  };
  get();
});

router.get("/by-status/:status", (req, res) => {
  let get = async () => {
    try {
      let result = await contractRepo.getByStatus(
        req.params.status,
        +req.query.offset || 0,
        +req.query.limit || config.maxCount
      );
      // result.rows = result.rows.map(item => item.get({ plain: true }));
      return res.json(result);
    } catch (err) {
      return res.status(400).send(err + "");
    }
  };
  get();
});

module.exports = router;
