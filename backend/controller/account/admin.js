let express = require("express");
let router = express.Router();
let accountRepo = require("../../repo/account");
let skillTagRepo = require("../../repo/skillTag");
const config = require("../../config");

router.get("/users", (req, res) => {
  let get = async () => {
    try {
      let result = await accountRepo.getUser(
        req.user.type === "root",
        +req.query.offset || 0,
        +req.query.limit || config.maxCount
      );

      result.rows = result.rows.map(item => {
        let res = item.get({ plain: true });
        delete res.password;
        return res;
      });
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

// router.get("/skill-tags", (req, res) => {
//   let get = async () => {
//     try {
//       let result = await skillTagRepo.adminGet(
//         +req.query.offset || 0,
//         +req.query.limit || config.maxCount
//       );

//       return res.json(result);
//     } catch (err) {
//       return res.json({
//         status: "fail",
//         msg: err + ""
//       });
//     }
//   };
//   get();
// });

// router.get("/users/change-status", (req, res) => {
//   let get = async () => {
//     try {
//       let result = await accountRepo.updateStatus(req.query.username);
//       return res.json(result);
//     } catch (e) {
//       return res.json({
//         status: "fail",
//         msg: err + ""
//       });
//     }
//   };
//   get();
// });

// router.get("/skill-tags/change-status", (req, res) => {
//   let get = async () => {
//     try {
//       let result = await skillTagRepo.updateStatus(req.query.id);
//       return res.json(result);
//     } catch (e) {
//       return res.json({
//         status: "fail",
//         msg: err + ""
//       });
//     }
//   };
//   get();
// });

router.delete("/:username", (req, res) => {
  //for admin/root
  let update = async () => {
    try {
      let accounts = await accountRepo.getAccountByUsername(
        req.params.username
      );
      accounts = accounts.map(item => item.get({ plain: true }));

      let accounts2 = await accountRepo.getAccountByUsername(req.user.username);
      accounts2 = accounts2.map(item => item.get({ plain: true }));

      if (!accounts.length) {
        throw "Không tồn tại username cần xóa.";
      }

      if (accounts[0].type === "root") {
        throw "Bạn không thể xóa tài khoản root";
      }

      if (accounts[0].type === "admin" || accounts2[0].type === "admin") {
        throw "Bạn không có quyền xóa tài khoản này";
      }

      let result = await accountRepo.deactive(req.params.username);
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

router.put("/active/:username", (req, res) => {
  //for admin/root
  let update = async () => {
    try {
      let accounts = await accountRepo.getAccountByUsername(
        req.params.username
      );
      accounts = accounts.map(item => item.get({ plain: true }));

      let accounts2 = await accountRepo.getAccountByUsername(req.user.username);
      accounts2 = accounts2.map(item => item.get({ plain: true }));

      if (!accounts.length) {
        throw "Không tồn tại username cần kích hoạt.";
      }

      if (accounts[0].type === "admin" || accounts2[0].type === "admin") {
        throw "Bạn không có quyền kích hoạt tài khoản này";
      }

      let result = await accountRepo.active(req.params.username);
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
