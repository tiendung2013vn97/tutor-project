const passport = require("passport");
module.exports = (req, res, next) => {
  passport.authenticate("jwt", { session: false })(req, res, (err, user) => {
    if (err) {
      return res.status(err.status).send();
    }
    next();
    // if (req.user.type === "admin") {
    //   next();
    // } else {
    //   res.status(403).send();
    // }
  });
};
