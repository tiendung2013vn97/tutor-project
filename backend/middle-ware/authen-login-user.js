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
      console.log("user", user);
      req.permiss = false;
    }
    next();
  })(req, res, () => {});
};
