var express = require("express");
let bodyParser = require("body-parser");

var user = require("./routes/user");
const passport = require("passport");
const cors = require("cors");
require("./passport");

var app = express();

app.use(bodyParser());
app.use(cors());

app.get("/", (req, res) => {
  return res.send("hello");
});

app.use("/user", user);
// app.get('/me',(req,res)=>{
//   passport.authenticate('jwt', {session: false})(req,res,()=>{
//     res.send(req.user);
//   })
// })

var port = process.env.PORT || 3002;
app.listen(port, () => {
  console.log(`API is running on port ${port}`);
});
