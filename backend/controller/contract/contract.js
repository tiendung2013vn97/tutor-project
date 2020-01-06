let express = require("express");
let router = express.Router();
let contractRepo = require("../../repo/contract");

router.get("/", (req, res) => {
  let get = async () => {
    try {
      let result = await contractRepo.get(
        +req.query.offset || 0,
        +req.query.limit || 1000000000
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
        +req.query.offset || 0,
        +req.query.limit || 1000000000
      );
      // result.rows = result.rows.map(item => item.get({ plain: true }));
      return res.json(result);
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
        +req.query.limit || 1000000000
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
