const express = require("express");
const router = express.Router();
const {
  getData,
  getDataById,
  insertData,
  deleteData,
  updateData,
} = require("../controller/account_controller");
const { accessValidation } = require("../middleware/accessValidation");

router.get("/", accessValidation, (req, res, next) => {
  getData(req, res, next);
});

router.post("/", accessValidation, (req, res, next) => {
  getDataById(req, res, next);
});

router.post("/add", accessValidation, (req, res, next) => {
  insertData(req, res, next);
});

router.post("/delete", accessValidation, (req, res, next) => {
  deleteData(req, res, next);
});

router.post("/update", accessValidation, (req, res, next) => {
  updateData(req, res, next);
});

module.exports = router;
