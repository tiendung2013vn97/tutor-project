const passport = require("passport");
module.exports = (req, res, next) => {
  passport.authenticate("jwt", { session: false })(req, res, () => {
    if (req.user.type === "admin") {
      next();
    } else {
      res.status(403).send();
    }
  });
};
