var express = require("express");
var router = express.Router();
const accountRepo = require("../../repo/account-repo");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const mailService=require('../../mail-service')

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
      code: 'NOT_ENOUGH_INFO',
      msg: "Vui lòng điền đủ thông tin các trường trước khi gửi."
    });
  }
  const registerService = async () => {
    try {
      let accounts = await accountRepo.getAccountByUsername(user.username);
      accounts = accounts.map(account => account.get({ plain: true }));
      if (accounts.length > 0) {
        return res.json({
          code: 'USERNAME_EXISTED',
          msg: "Username đã tồn tại! Vui lòng nhập username khác."
        });
      }

      accounts = await accountRepo.getAccountByEmail(user.email);
      accounts = accounts.map(account => account.get({ plain: true }));
      if (accounts.length > 0) {
        return res.json({
          code: 'EMAIL_EXISTED',
          msg: "Email đã tồn tại! Vui lòng nhập email khác."
        });
      }

      await mailService.sendMailConfirm
      let resultAddAccount = await accountRepo.addAccount(user);
      if (resultAddAccount) {
        return res.json({
          statusCode: 200,
          mgs: "Thêm account thành công!"
        });
      } else {
        return res.json({
          statusCode: 500,
          mgs: "Thêm account thất bại!"
        });
      }
    } catch (error) {
      return res.json({
        statusCode: 500,
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

router.get("/", (req, res) => {
  res.send("haha");
});
module.exports = router;
