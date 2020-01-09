let accountRepo = require("../../repo/account");
const utility=require("../../utility")

let express = require("express");
let router = express.Router();
let multer = require("multer");

let storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "public/asset/images");
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});
let upload = multer({ storage: storage }).single("file");

router.get("/info", (req, res) => {
  let get = async () => {
    try {
      let result = await accountRepo.getAccountByUsername(req.user.username);
      return res.json(result[0]);
    } catch (err) {
      if (err.code) {
        return res.json(err);
      } else {
        return res.json({
          status: "fail",
          msg: err + ""
        });
      }
    }
  };
  get();
});

router.post("/upload-image", function(req, res) {
  //for login
  upload(req, res, function(err) {
    if (err instanceof multer.MulterError) {
      return res.status(500).json(err);
    } else if (err) {
      return res.status(500).json(err);
    }
    return res.status(200).send(req.file);
  });
});

router.put("/", (req, res) => {
  let update = async () => {
    let args = {
      fullname: {
        val: req.body.fullname,
        allowEmpty: false
      },
      age: {
        val: req.body.age,
        dataType: "int"
      },
      gender: {
        val: req.body.gender,
        expected: ["male", "female"]
      },
      locationId: {
        val: req.body.locationId,
        dataType: "int"
      },
      intro: {
        val: req.body.intro
      },
      money: {
        val: req.body.money,
        dataType: "int"
      }
    };

    try {
      utility.validateRequireParam(args);
      utility.validateEmpty(args);
      utility.validateTypeAndRegex(args);
      utility.validateMaxLength(args);
      utility.validateExpectedValues(args);

      let info = utility.convertToValueObject(args);
      let result = await accountRepo.update(req.user.username, info);

      return res.json(result);
    } catch (err) {
      if (err.code) {
        return res.json(err);
      } else {
        return res.json({
          status: "fail",
          msg: err + ""
        });
      }
    }
  };
  update();
});

router.put("/password", (req, res) => {
  //for admin/root

  let args = {
    password: {
      val: req.body.password,
      require: true,
      allowEmpty: false
    }
  };

  let update = async () => {
    try {
      utility.validateRequireParam(args);
      utility.validateEmpty(args);
      utility.validateTypeAndRegex(args);
      utility.validateMaxLength(args);

      let info = utility.convertToValueObject(args);
      let result = await accountRepo.updatePassword(
        req.user.username,
        info.password
      );
      return res.json(result);
    } catch (err) {
      if (err.code) {
        return res.json(err);
      } else {
        return res.json({
          status: "fail",
          msg: err + ""
        });
      }
    }
  };
  update();
});
module.exports = router;
