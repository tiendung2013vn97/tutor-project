const passport = require("passport");
module.exports = (req, res, next) => {
  passport.authenticate("jwt", { session: false })(req, res, (err, user) => {
    if (err) {
      return res.json({
        status: "fail",
        msg: err + ""
      });
    }
    if (req.user.type === "admin") {
      next();
    } else {
      return res.json({
        status: "fail",
        CODE:"NOT_ALLOW",
        msg: err + ""
      });
    }
  });
};
