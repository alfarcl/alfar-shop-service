let createError = require("http-errors");
let express = require("express");
require("dotenv").config();
let path = require("path");
let cookieParser = require("cookie-parser");
var cors = require("cors");
let indexRouter = require("./routes/index");
let productCategoryRouter = require("./routes/product_category_router");
let productRouter = require("./routes/product_router");
let productVariantRouter = require("./routes/product_variant_router");
let accountRoleRouter = require("./routes/account_role_router");
let accountRouter = require("./routes/account_router");
let transactionRouter = require("./routes/transaction_router");
let authRouter = require("./routes/auth_router");
let cartRouter = require("./routes/cart_router");


let app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/", indexRouter);
app.use("/api/product-category", productCategoryRouter);
app.use("/api/product", productRouter);
app.use("/api/product-variant", productVariantRouter);
app.use("/api/account-role", accountRoleRouter);
app.use("/api/account", accountRouter);
app.use("/api/transaction", transactionRouter);
app.use("/api/auth", authRouter);
app.use("/api/cart", cartRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
});

module.exports = app;
