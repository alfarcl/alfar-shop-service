const express = require("express");
const router = express.Router();
const { login, register } = require("../controller/auth_controller");

router.post("/login", (req, res, next) => {
  login(req, res, next);
});

router.post("/register", (req, res, next) => {
  register(req, res, next);
});
module.exports = router;
