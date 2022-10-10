var express = require("express"),
  router = express.Router(),
  verifyToken = require('../middlewares/authJWT'),
  {
    signup,
    signin
  } = require("../controllers/auth.controller.js");

router.post("/register", signup);

router.post("/login", signin);

router.get("/hiddencontent", verifyToken, function (req, res) {
  if (!req.user) {
    res.status(403)
      .send({
        message: "Invalid JWT token"
      });
  }
  if (req.user.role == "admin") {
    res.status(200)
      .send({
        message: "Congratulations! but there is no hidden content"
      });
  } else {
    res.status(403)
      .send({
        message: "Unauthorized access"
      });
  }
});

module.exports = router;