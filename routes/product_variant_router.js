const express = require("express");
const router = express.Router();
const {
  getData,
  getDataById,
  insertProduct,
  deleteProduct,
  updateProduct,
} = require("../controller/product_variant_controller");
const { accessValidation } = require("../middleware/accessValidation");

router.get("/", accessValidation, (req, res, next) => {
  getData(req, res, next);
});

router.post("/", accessValidation, (req, res, next) => {
  getDataById(req, res, next);
});

router.post("/add", accessValidation, (req, res, next) => {
  insertProduct(req, res, next);
});

router.post("/delete", accessValidation, (req, res, next) => {
  deleteProduct(req, res, next);
});

router.post("/update", accessValidation, (req, res, next) => {
  updateProduct(req, res, next);
});

module.exports = router;
