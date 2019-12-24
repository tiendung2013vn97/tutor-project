const accountRepo = require("./repo/accountRepo");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
passport.use(
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password"
    },
    function(username, password, cb) {
      //this one is typically a DB call. Assume that the returned user object is pre-formatted and ready for storing in JWT
      let users = null;

      accountRepo
        .getAccountByUsernameAndPassword(username, password)
        .then(accounts => {
          users = accounts.map(account => account.get({ plain: true }));

          if (users.length === 0) {
            return cb(null, false, {
              message: "Username hoặc password không hợp lệ."
            });
          }
          return cb(null, users[0], { message: "Đăng nhập thành công " });
        })
        .catch(err => {
          console.log(err, username, password);
          return cb(null, false, {
            message: err
          });
        });
    }
  )
);

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: "your_jwt_secret"
    },
    function(jwtPayload, cb) {
      //find the user in db if needed

      let users = accountRepo
        .getAccountByUsername(jwtPayload.username)
        .then(users => {
          users = users.map(item => item.get({ plain: true }));
          return cb(null, users[0]);
        })
        .catch(err => {
          return res.status(400).send(err + "");
        });
    }
  )
);
