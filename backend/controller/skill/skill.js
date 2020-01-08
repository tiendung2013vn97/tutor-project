let express = require("express");
let router = express.Router();
let skillRepo = require("../../repo/skill");
const config = require("../../config");

router.get("/", (req, res) => {
  //for public
  let get = async () => {
    try {
      let result = await skillRepo.get(
        +req.query.offset || 0,
        +req.query.limit || config.maxCount
      );
      result.rows = result.rows.map(item => item.get({ plain: true }));
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

router.get("/:id", (req, res) => {
  //for public
  let get = async () => {
    try {
      let result = await skillRepo.getByTeacher(
        req.params.id,
        +req.query.offset || 0,
        +req.query.limit || config.maxCount
      );
      result.rows = result.rows.map(item => item.get({ plain: true }));
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
  //for teacher
  let args = {
    skillTagId: {
      val: req.body.skillTagId,
      require: true,
      dataType: "int"
    },
    note: {
      val: req.body.note,
      require: true
    },
    costPerHour: {
      val: req.body.costPerHour,
      dataType: "int",
      require: true
    }
  };

  let create = async () => {
    try {
      utility.validateRequireParam(args);
      utility.validateEmpty(args);
      utility.validateTypeAndRegex(args);
      utility.validateMaxLength(args);

      let info = utility.convertToValueObject(args);
      info.teacherId = req.user.username;
      let result = await skillRepo.create(info);
      return res.json(result);
    } catch (err) {
      return res.json({
        status: "fail",
        msg: err + ""
      });
    }
  };
  create();
});

router.put("/:skillId", (req, res) => {
  //for teacher
  let args = {
    note: {
      val: req.body.note
    },
    costPerHour: {
      val: req.body.costPerHour,
      dataType: "int"
    }
  };

  let update = async () => {
    try {
      utility.validateRequireParam(args);
      utility.validateEmpty(args);
      utility.validateTypeAndRegex(args);
      utility.validateMaxLength(args);

      let skills = await skillRepo.getByTeacherWithSkillId(
        req.params.skillId,
        req.user.username
      );
      if (!skills.length) {
        throw "teacherId không hợp lệ hoặc skill không tồn tại";
      }

      let info = utility.convertToValueObject(args);
      info.teacherId = req.user.username;
      let result = await skillRepo.update(req.params.skillId, info);
      return res.json(result);
    } catch (err) {
      return res.json({
        status: "fail",
        msg: err + ""
      });
    }
  };
  update();
});

router.delete("/:skillId", (req, res) => {
  //for teacher

  let update = async () => {
    try {
      let skills = await skillRepo.getByTeacherWithSkillId(
        req.params.skillId,
        req.user.username
      );

      if (!skills.length) {
        throw "teacherId không hợp lệ hoặc skill không tồn tại";
      }

      let info = {
        isActived: false
      };
      let result = await skillRepo.update(req.params.skillId, info);
      return res.json(result);
    } catch (err) {
      return res.json({
        status: "fail",
        msg: err + ""
      });
    }
  };
  update();
});

module.exports = router;
