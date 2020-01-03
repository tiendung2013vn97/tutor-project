let express = require("express");
let router = express.Router();
const accountRepo = require("../../repo/accountRepo");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const mailService = require("../../mail-service");
let SHA256 = require("crypto-js/sha256");

router.post("/register", function(req, res, next) {
  console.log("register user", req.body);
  let user = req.body;
  if (
    !user.username ||
    !user.password ||
    !user.email ||
    !user.fullname ||
    !user.age ||
    !user.gender ||
    !user.locationId ||
    !user.type
  ) {
    return res.json({
      status: "fail",
      code: "NOT_ENOUGH_INFO",
      msg: "Vui lòng điền đủ thông tin các trường trước khi gửi."
    });
  }

  const registerService = async () => {
    try {
      let accounts = await accountRepo.getAccountByUsername(user.username);
      accounts = accounts.map(account => account.get({ plain: true }));
      if (accounts.length > 0) {
        return res.json({
          status: "fail",
          code: "USERNAME_EXISTED",
          msg: "Username đã tồn tại! Vui lòng nhập username khác."
        });
      }

      accounts = await accountRepo.getAccountByEmail(user.email);
      accounts = accounts.map(account => account.get({ plain: true }));
      if (accounts.length > 0) {
        return res.json({
          status: "fail",
          code: "EMAIL_EXISTED",
          msg: "Email đã tồn tại! Vui lòng nhập email khác."
        });
      }

      await mailService.sendMailConfirm(user);
      return res.json({
        status: "success",
        msg:
          "Đăng kí thành công,vui lòng đăng nhập email và kích hoạt tài khoản để có thể đăng nhập"
      });
    } catch (error) {
      return res.json({
        status: "fail",
        msg: "" + error
      });
    }
  };
  registerService();
});

router.post("/login", function(req, res, next) {
  passport.authenticate("local", { session: false }, (err, user, info) => {
    if (err || !user) {
      return res.status(200).json({
        status: "fail",
        code: "WRONG_USERNAME_OR_PASSWORD",
        msg: info ? info.message : "Đăng nhập thất bại."
      });
    }

    if (user.isActived === false) {
      return res.status(200).json({
        status: "fail",
        code: "ACCOUNT_IS_BLOCKED",
        msg: "Tài khoản này hiện đang bị khóa"
      });
    }

    user = Object.assign({}, user);
    req.login(user, { session: false }, err => {
      if (err) {
        res.send(err);
      }

      const token = jwt.sign(user, "your_jwt_secret");
      delete user.password;
      return res.json({ user, token });
    });
  })(req, res);
});

router.get("/verify-email?", (req, res) => {
  mailService
    .verifyEmailToken(req.query.emailToken)
    .then(user => {
      user.password = SHA256(user.password) + "";
      accountRepo.getAccountByUsername(user.username).then(accounts => {
        accounts = accounts.map(account => account.get({ plain: true }));
        if (accounts.length) {
          return res.json({
            status: "fail",
            code: "USERNAME_EXISTED"
          });
        } else {
          accountRepo
            .addAccount(user)
            .then(val => {
              return res.json({
                status: "success",
                msg: "Kích hoạt tài khoản thành công. Bạn có thể đăng nhập "
              });
            })
            .catch(err => {
              return res.json({
                status: "fail",
                code: "VERIFY_EMAIL_FAIL",
                msg: err + ""
              });
            });
        }
      });
    })
    .catch(err => {
      return res.json({
        status: "fail",
        code: "VERIFY_EMAIL_FAIL",
        msg: err + ""
      });
    });
});

router.get("/verify-changed-password?", (req, res) => {
  mailService
    .verifyEmailToken(req.query.emailToken)
    .then(user => {
      console.log("pass", user.password);
      user.password = SHA256(user.password) + "";
      console.log("user", user);
      accountRepo.updatePassword(user.username, user.password);
    })
    .then(val => {
      return res.json({
        status: "success",
        msg: "Thay đổi mật khẩu thành công "
      });
    })
    .catch(err => {
      return res.json({
        status: "fail",
        code: "VERIFY_EMAIL_FAIL",
        msg: err + ""
      });
    });
});

router.post("/change-password", (req, res) => {
  let changePassService = async () => {
    try {
      if (!req.body.newPassword) throw "missing newPassword";
      let users = await accountRepo.getAccountByUsername(req.body.username);
      users = users.map(account => account.get({ plain: true }));

      if (users.length) {
        let user = users[0];
        user.password = req.body.newPassword;
        await mailService.sendMailConfirmChangePassword(user);
        return res.json({
          status: "success",
          msg: "Vui lòng đăng nhập email để kích hoạt password mới"
        });
      } else {
        throw "username không tồn tại";
      }
    } catch (err) {
      console.log(err);
      return res.json({
        status: "fail",
        code: "CHANGE_PASSWORD_FAIL",
        msg: err + ""
      });
    }
  };
  changePassService();
});

router.get("/user/:username", (req, res) => {
  let get = async () => {
    try {
      let result = await accountRepo.getAccountByUsername(req.params.username);
      return res.json(result[0]);
    } catch (err) {
      return res.status(400).send(err + "");
    }
  };
  get();
});

module.exports = router;
