const passport = require("passport");
module.exports = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user) => {
    if (user) {
      req.user = user;

      if (["admin", "root"].includes(req.user.type)) {
        req.permiss = true;
      } else {
        req.permiss = false;
      }
    } else {
      req.permiss = false;
    }
    next();
  })(req, res, () => {});
};
