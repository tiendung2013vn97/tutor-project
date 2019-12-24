const passport = require("passport");
module.exports = (req, res, next) => {
  passport.authenticate("jwt", { session: false })(req, res, (err, user) => {
    console.log(req.user)
    if(err){
    res.status(err.status).send();
  }
  if (req.user.type === "admin") {
    next();
  } else {
    res.status(403).send();
  }
});
};
