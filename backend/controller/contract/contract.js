let express = require("express");
let router = express.Router();
let contractRepo = require("../../repo/contract");
let accountRepo = require("../../repo/account");
let moneyRepo = require("../../repo/money");
const config = require("../../config");
const utility = require("../../utility");

router.get("/", (req, res) => {
  //for login user
  let get = async () => {
    try {
      let result = await contractRepo.get(
        req.user,
        +req.query.offset || 0,
        +req.query.limit || config.maxCount
      );
      // result.rows = result.rows.map(item => item.get({ plain: true }));
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
  get();
});

router.get("/by-id/:id", (req, res) => {
  //for login user
  console.log(req.user, req.params)
  let get = async () => {
    try {
      if (req.user.type == "student") {
        let contracts = await contractRepo.getByStudentId(
          req.user.username,
          req.params.id
        );
        contracts = contracts.map(item => item.get({ plain: true }));
        if (!contracts.length) {
          throw "Hợp đồng này đã bị xóa hoặc studentId không hợp lệ";
        }
      }

      if (req.user.type == "teacher") {
        let contracts = await contractRepo.getByTeacherId(
          req.user.username,
          req.params.id
        );
        contracts = contracts.map(item => item.get({ plain: true }));
        if (!contracts.length) {
          throw "Hợp đồng này đã bị xóa hoặc teacherId không hợp lệ";
        }
      }

      let result = await contractRepo.getById(1006, req.permiss);
      result = result.map(item => item.get({ plain: true }));
      console.log(result)

      if (result.length) {
        return res.json(result[0]);
      }

      return res.json({
        status: "fail",
        code: "NO_CONTRACT"
      });
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

router.get("/by-status/:status", (req, res) => {
  //for admin/root
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

router.put("/student-complain/:contractId", (req, res) => {
  //for student
  let args = {
    complainDetail: {
      val: req.body.complainDetail,
      require: true
    }
  };

  let update = async () => {
    try {
      utility.validateRequireParam(args);
      utility.validateEmpty(args);
      utility.validateTypeAndRegex(args);
      utility.validateMaxLength(args);

      let contracts = await contractRepo.getByStudentId(
        req.user.username,
        req.params.contractId,
        req.permiss
      );
      contracts = contracts.map(item => item.get({ plain: true }));
      if (!contracts.length) {
        throw "studentId không hợp lệ";
      }

      let info = utility.convertToValueObject(args);
      info.status = "complaining";
      let result = await contractRepo.update(
        req.params.contractId,
        info,
        "inProgress"
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

router.put("/resolve-complain/:contractId", (req, res) => {
  //for admin
  let args = {
    resolveDetail: {
      val: req.body.resolveDetail,
      require: true
    },
    studentReMoney: {
      val: req.body.studentReMoney,
      require: true,
      dataType: "int"
    }
  };

  let update = async () => {
    try {
      utility.validateRequireParam(args);
      utility.validateEmpty(args);
      utility.validateTypeAndRegex(args);
      utility.validateMaxLength(args);

      let info = utility.convertToValueObject(args);
      info.status = "resolvedComplain";
      info.rate = 1;

      let contracts = await contractRepo.getById(
        req.params.contractId,
        req.permiss
      );

      contracts = contracts.map(item => item.get({ plain: true }));
      if (!contracts.length) {
        throw "Hợp đồng này không tồn tại";
      }

      if (
        info.studentReMoney >
        contracts[0].totalHours * contracts[0].costPerHour
      ) {
        throw "Số tiền hoàn trả vượt mức tổng tiền đặt cọc ban đầu";
      }

      let finishedContracts = await contractRepo.getFinishedContractByTeacherId(
        contracts[0].skill.teacherId,
        req.params.id
      );
      let generalRate = -1;
      let percent = 1;
      if (!finishedContracts.length) {
        generalRate = 1;
      } else {
        percent =
          finishedContracts.length > 20
            ? 1
            : 0.8 + (20 - finishedContracts.length / 20) * 0.2;

        let sumRate = 0;
        finishedContracts.forEach(contract => {
          sumRate += contract.rate;
        });
        generalRate = (sumRate * percent) / finishedContracts.length;
      }

      await accountRepo.update(contracts[0].skill.teacherId, {
        rate: generalRate
      });

      await moneyRepo.addMoney(
        contracts[0].studentId,
        info.studentReMoney,
        req.permiss
      );

      let reTeacherMoney =
        contracts[0].totalHours * contracts[0].costPerHour -
        info.studentReMoney;
      await moneyRepo.subMoney(
        contracts[0].skill.teacherId,
        reTeacherMoney,
        req.permiss
      );

      let result = await contractRepo.update(
        req.params.contractId,
        info,
        "complaining",
        req.permiss
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

router.put("/finish/:contractId", (req, res) => {
  //for student
  let args = {
    rate: {
      val: req.body.rate,
      require: true
    },
    studentComment: {
      val: req.body.studentComment,
      require: true
    }
  };
  let update = async () => {
    try {
      utility.validateRequireParam(args);
      utility.validateEmpty(args);
      utility.validateTypeAndRegex(args);
      utility.validateMaxLength(args);

      let info = utility.convertToValueObject(args);
      info.status = "finished";
      info.toDt = new Date().getTime();

      let contracts = await contractRepo.getByStudentId(
        req.user.username,
        req.params.contractId,
        req.permiss
      );

      contracts = contracts.map(item => item.get({ plain: true }));
      if (!contracts.length) {
        throw "Hợp đồng này không tồn tại hoặc đã bị xóa";
      }

      let result = await contractRepo.update(
        req.params.contractId,
        info,
        "inProgress",
        req.permiss
      );

      let finishedContracts = await contractRepo.getFinishedContractByTeacherId(
        contracts[0].skill.teacherId,
        req.params.id
      );
      let generalRate = -1;
      let percent = 1;
      if (!finishedContracts.length) {
        generalRate = info.rate * 0.8;
      } else {
        percent =
          finishedContracts.length > 20
            ? 1
            : 0.8 + (20 - finishedContracts.length / 20) * 0.2;

        let sumRate = 0;
        finishedContracts.forEach(contract => {
          sumRate += contract.rate;
        });
        generalRate = (sumRate * percent) / finishedContracts.length;
      }

      await accountRepo.update(contracts[0].skill.teacherId, {
        rate: generalRate
      });

      await moneyRepo.addMoney(
        contracts[0].skill.teacherId,
        contracts[0].totalHours * contracts[0].costPerHour,
        req.permiss
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

router.put("/cancle/:contractId", (req, res) => {
  //for admin
  let update = async () => {
    try {
      let info = {
        status: "cancled"
      };

      let result = await contractRepo.update(
        req.params.contractId,
        info,
        undefined,
        req.permiss
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

// router.delete("/:contractId", (req, res) => {
//   //for admin/root

//   let update = async () => {
//     try {
//       let info = {
//         isActived: false
//       };
//       let result = await contractRepo.update(req.params.contractId, info);
//       return res.json(result);
//     } catch (err) {
//       return res.json({
//         status: "fail",
//         msg: err + ""
//       });
//     }
//   };
//   update();
// });

module.exports = router;
