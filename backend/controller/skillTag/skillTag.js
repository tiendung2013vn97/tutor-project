let express = require("express");
let router = express.Router();
let skillTagRepo = require("../../repo/skillTag");
const config = require("../../config");
const utility = require("../../utility");

router.get("/", (req, res) => {
  //for public
  let get = async () => {
    try {
      let result = await skillTagRepo.get(
        req.permiss,
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
  //for public
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
  //for admin/root
  let args = {
    name: {
      val: req.body.name,
      require: true,
      allowEmpty: false
    }
  };

  let update = async () => {
    try {
      utility.validateRequireParam(args);
      utility.validateEmpty(args);
      utility.validateTypeAndRegex(args);
      utility.validateMaxLength(args);

      let info = utility.convertToValueObject(args);

      let result = await skillTagRepo.update(req.params.id, info);
      return res.json(result);
    } catch (err) {
      return res.json({
        status: "fail",
        msg: err.msg
      });
    }
  };
  update();
});

router.post("/", (req, res) => {
  //for teacher and admin/root
  let args = {
    name: {
      val: req.body.name,
      require: true,
      allowEmpty: false
    }
  };

  let update = async () => {
    try {
      utility.validateRequireParam(args);
      utility.validateEmpty(args);
      utility.validateTypeAndRegex(args);
      utility.validateMaxLength(args);

      let info = utility.convertToValueObject(args);

      let result = await skillTagRepo.add(info);
      return res.json(result);
    } catch (err) {
      return res.json({
        status: "fail",
        msg: err.msg
      });
    }
  };
  update();
});

router.get("/:id", (req, res) => {
  //for public
  let get = async () => {
    try {
      let result = await skillTagRepo.getById(req.params.id, req.permiss);
      result = result.map(item => item.get({ plain: true }));

      if (result.length) {
        return res.json(result[0]);
      }

      return res.json();
    } catch (err) {
      if (err.code) {
        return res.json(err);
      } else {
        return res.json({
          status: "fail",
          msg: err + ""
        });
      }
    }
  };
  get();
});

router.delete("/:id", (req, res) => {
  //for admin/root
  let update = async () => {
    try {
      let info = {
        isActived: false
      };
      let result = await skillTagRepo.update(req.params.id, info);
      return res.json(result);
    } catch (err) {
      if (err.code) {
        return res.json(err);
      } else {
        return res.json({
          status: "fail",
          msg: err + ""
        });
      }
    }
  };
  update();
});

router.put("/active/:id", (req, res) => {
  //for admin/root
  let update = async () => {
    try {
      let info = {
        isActived: true
      };
      let result = await skillTagRepo.update(req.params.id, info);
      return res.json(result);
    } catch (err) {
      if (err.code) {
        return res.json(err);
      } else {
        return res.json({
          status: "fail",
          msg: err + ""
        });
      }
    }
  };
  update();
});

module.exports = router;
