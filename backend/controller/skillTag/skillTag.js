let express = require("express");
let router = express.Router();
let skillTagRepo = require("../../repo/skillTagRepo");
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
        msg: err + ""
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
        msg: err + ""
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
        msg: err + ""
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
        msg: err + ""
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

module.exports = router;
