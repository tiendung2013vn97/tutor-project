let express = require("express");
let router = express.Router();
let locationRepo = require("../../repo/location");

router.get("/", (req, res) => {
  locationRepo.getLocation().then(locations => {
    return res.json(locations);
  });
});
module.exports = router;
