let express = require("express");
let router = express.Router();
let locationRepo = require("../../repo/location");

router.get("/", (req, res) => {
  locationRepo
    .getLocation()
    .then(locations => {
      return res.json({
        status: "success",
        data: locations
      });
    })
    .catch(err => {
      return res.json({
        status: "fail",
        code: "GET_LOCATION_FAIL",
        msg: err + ""
      });
    });
});

module.exports = router;
