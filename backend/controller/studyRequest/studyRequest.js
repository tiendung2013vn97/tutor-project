let express = require("express");
let router = express.Router();
let skillRepo = require("../../repo/skill");
const config = require("../../config");

router.get("/", (req, res) => {
    let get = async () => {
      try {
        let result = await skillRepo.get(
          +req.query.offset || 0,
          +req.query.limit || config.maxCount
        );
        result.rows = result.rows.map(item => item.get({ plain: true }));
        return res.json(result);
      } catch (err) {
        return res.status(400).send(err + "");
      }
    };
    get();
  });