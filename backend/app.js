const express = require("express");
const bodyParser = require("body-parser");

const publicUser = require("./controller/account/publicUser");
const loginUser = require("./controller/account/loginUser");
const admin = require("./controller/account/admin");
const authenAdmin = require("./middle-ware/authen-admin");
const authenLoginUser = require("./middle-ware/authen-login-user");
const cors = require("cors");
const location = require("./controller/location/location");
const skillTag = require("./controller/skillTag/skillTag");
const skill = require("./controller/skill/skill");
const comment = require("./controller/comment/comment");

require("./passport");

let app = express();

app.use(bodyParser());
app.use(cors());

app.get("/", (req, res) => {
  return res.send("hello");
});

app.use("/location", location);
app.use("/public-user", publicUser);
app.use("/login-user", authenLoginUser, loginUser);
app.use("/admin", authenAdmin, admin);
app.use("/skill-tag", skillTag);
app.use("/skill", skill);
app.use("/comment", comment);

let port = process.env.PORT || 3002;
app.listen(port, () => {
  console.log(`API is running on port ${port}`);
});
