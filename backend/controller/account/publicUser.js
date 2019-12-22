var express = require("express");
var router = express.Router();
const accountRepo = require("../../repo/account-repo");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const mailService = require("../../mail-service");
var SHA256 = require("crypto-js/sha256");

router.post("/register", function(req, res, next) {
  console.log("register user", req.body);
  let user = req.body;
  if (
    !user.username ||
    !user.password ||
    !user.email ||
    !user.fullname ||
    !user.age ||
    !user.gender
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

      await mailService.sendMailConfirm;
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
    console.log("authenticating ", err, user);
    if (err || !user) {
      return res.status(200).json({
        statusCode: 400,
        message: info ? info.message : "Đăng nhập thất bại.",
        user: user
      });
    }

    user = Object.assign({}, user);
    req.login(user, { session: false }, err => {
      if (err) {
        res.send(err);
      }

      const token = jwt.sign(user, "your_jwt_secret");

      return res.json({ user, token });
    });
  })(req, res);
});

router.get("/verify-email?", (req, res) => {
  mailService
    .verifyEmailToken(req.query.emailToken)
    .then(user => {
      user.password = SHA256(user.password);
      console.log("user", user);
      accountRepo.addAccount(user);
    })
    .then(val => {
      return res.json({
        status: "success",
        data: val
      });
    })
    .catch(err => {
      return res.json({
        status: "fail",
        code: "VERIFY_EMAIL_FAIL",
        msg: err
      });
    });
});

router.get("/verify-changed-password?", (req, res) => {
  mailService
    .verifyEmailToken(req.query.emailToken)
    .then(user => {
      user.password = SHA256(user.password);
      console.log("user", user);
      accountRepo.updatePassword(user.username, user.password);
    })
    .then(val => {
      return res.json({
        status: "success",
        data: val
      });
    })
    .catch(err => {
      return res.json({
        status: "fail",
        code: "VERIFY_EMAIL_FAIL",
        msg: err
      });
    });
});

router.post("/change-password", (req, res) => {
  try {
    if (req.body.newPassword) throw "missing newPassword";
    let users = accountRepo.getAccountByUsername(req.body.username);
    users = users.map(account => account.get({ plain: true }));
    if (users.length) {
      let user = users[0];
      user.password = req.body.newPassword;
      mailService.sendMailConfirmChangePassword(user);
    } else {
      throw "username không tồn tại";
    }
  } catch (err) {
    return res.json({
      status: "fail",
      code: "CHANGE_PASSWORD_FAIL",
      msg: err
    });
  }
});
module.exports = router;
