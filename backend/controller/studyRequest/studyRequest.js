let express = require("express");
let router = express.Router();
let studyRequestRepo = require("../../repo/studyRequest");
const config = require("../../config");
const utility = require("../../utility");

router.get("/", (req, res) => {
  let get = async () => {
    try {
      let result = await studyRequestRepo.get(
        req.permiss,
        +req.query.offset || 0,
        +req.query.limit || config.maxCount
      );
      result.rows = result.rows.map(item => item.get({ plain: true }));
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

router.post("/:skillId", (req, res) => {
  let get = async () => {
    try {
      let result = await studyRequestRepo.create(
        req.params.skillId,
        req.user.username
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

router.put("/teacher-confirm/:contractId", (req, res) => {
  let args = {
    detail: {
      val: req.body.detail,
      require: true,
      allowEmpty: false
    },
    totalHours: {
      val: req.body.totalHours,
      dataType: "int",
      require: true
    },
    startDt: {
      val: req.body.startDt,
      dataType: "int",
      require: true
    },
    etaDt: {
      val: req.body.etaDt,
      dataType: "int",
      require: true
    }
  };

  let update = async () => {
    try {
      utility.validateRequireParam(args);
      utility.validateEmpty(args);
      utility.validateTypeAndRegex(args);
      utility.validateMaxLength(args);

      let studyRequests = await studyRequestRepo.getByTeacherId(
        req.user.username,
        req.params.contractId
      );
      console.log(studyRequests);
      studyRequests = studyRequests.map(item => item.get({ plain: true }));

      if (!studyRequests.length) {
        throw "techerId không hợp lệ";
      }

      info = utility.convertToValueObject(args);
      info.status = "waitingStudent";
      let result = await studyRequestRepo.update(
        req.params.contractId,
        info,
        "waitingTeacher"
      );

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

router.put("/student-confirm/:contractId", (req, res) => {
  let update = async () => {
    try {
      let info = {
        status: "inProgress"
      };

      let result = await studyRequestRepo.update(
        req.params.contractId,
        info,
        "waitingStudent"
      );

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

router.get("/test", (req, res) => {
  studyRequestRepo
    .getByTeacherId("teacher1")
    .then(val => res.json(val))
    .catch(err => console.log(err));
});

module.exports = router;