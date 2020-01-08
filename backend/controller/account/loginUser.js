let accountRepo = require("../../repo/account");


let express = require("express");
let router = express.Router();

router.get("/", (req, res) => {
  res.send("hahalo");
});

router.get("/info", (req, res)=>{
  let get = async () => {
    try {
      let result = await accountRepo.getAccountByUsername(req.user.username);
      return res.json(result[0]);
    } catch (err) {
      return res.json({
        status: "fail",
        msg: err + ""
      });
    }
  };
  get();
})
module.exports = router;
