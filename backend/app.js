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
const message = require("./controller/message/message");
const contract = require("./controller/contract/contract");
const studyRequest = require("./controller/studyRequest/studyRequest");

require("./passport");

let app = express();

app.use(bodyParser());
app.use(cors());

app.use(require("./middle-ware/authen-login-user"));
app.use(require("./middle-ware/decentralization"));
app.get("/", (req, res) => {
  return res.send("hello");
});

app.use("/location", location);
app.use("/public-user", publicUser);
app.use("/login-user", loginUser);
app.use("/admin", admin);
app.use("/skill-tag", skillTag);
app.use("/skill", skill);
app.use("/message", message);
app.use("/contract", contract);
app.use("/study-request", studyRequest);

let port = process.env.PORT || 3002;
app.listen(port, () => {
  console.log(`API is running on port ${port}`);
});
