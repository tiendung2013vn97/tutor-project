let express = require("express");
let router = express.Router();
let skillTagRepo = require("../../repo/skillTagRepo");

router.get("/all", (req, res) => {
  let getAll = async () => {
    try {
      let result = await skillTagRepo.getAll();
      return res.json(result);
    } catch (err) {
      return res.status(400).send(err + "");
    }
  };
  getAll();
});

router.get("/", (req, res) => {
  let get = async () => {
    try {
      let result = await skillTagRepo.get(
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
