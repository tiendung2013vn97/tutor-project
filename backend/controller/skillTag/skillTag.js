let express = require("express");
let router = express.Router();
let skillTagRepo = require("../../repo/skillTag");
const config = require("../../config");

router.get("/", (req, res) => {
  let get = async () => {
    try {
      let result = await skillTagRepo.get(
        +req.query.offset || 0,
        +req.query.limit || config.maxCount
      );

      return res.json(result);
    } catch (err) {
      return res.json({
        status: "fail",
       msg: err.msg
      });
    }
  };
  get();
});

router.get("/top", (req, res) => {
  let get = async () => {
    try {
      let result = await skillTagRepo.getTop(+req.query.limit || 10);
      return res.json(result);
    } catch (err) {
      return res.json({
        status: "fail",
       msg: err.msg
      });
    }
  };
  get();
});

router.put("/:id", (req, res) => {
  let get = async () => {
    try {
      if (!req.params.id) {
        return res.json({
          status: "fail",
          code: "MISSING_PARAM",
          msg: "Thiếu tham số id"
        });
      }

      let result = await skillTagRepo.update(req.params.id, req.body);
      return res.json(result);
    } catch (err) {
      return res.json({
        status: "fail",
       msg: err.msg
      });
    }
  };
  get();
});

router.post("/", (req, res) => {
  if (!req.body.name) {
    return res.json({
      status: "fail",
      code: "MISSING_PARAM",
      msg: "Thiếu tham số name"
    });
  }

  let get = async () => {
    try {
      let result = await skillTagRepo.add(req.body);
      return res.json(result);
    } catch (err) {
      return res.json({
        status: "fail",
       msg: err.msg
      });
    }
  };
  get();
});

router.get("/top", (req, res) => {
  let get = async () => {
    try {
      let result = await skillTagRepo.getTop(+req.query.limit || 10);
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
      let result = await skillTagRepo.getById(
          req.params.id,
          +req.query.offset || 0,
          +req.query.limit || 1000000000
      );
      // result.rows = result.rows.map(item => item.get({ plain: true }));
      return res.json(result[0]);
    } catch (err) {
      return res.status(400).send(err + "");
    }
  };
  get();
});

module.exports = router;
