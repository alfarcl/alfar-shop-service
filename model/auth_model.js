const { ExecuteSQL } = require("../config/database");
const jwt = require("jsonwebtoken");
const { responseDataAuth } = require("../utils/responseHandler");

exports.login = (req, res, query) => {
  ExecuteSQL(query)
    .then((db) => {
      const data = db.recordset;
      if (data.length > 0) {
        const payload = {
          id: data[0].id,
          name: data[0].name,
        };
        const secret = "alfarcl";
        const expiresIn = 60 * 60 * 1; // second * minute * hour (1 hour)
        const token = jwt.sign(payload, secret, { expiresIn: expiresIn });
        console.log(data);
        responseDataAuth(res, 200, "Berhasil Login", token, {
          id: data[0].id,
          name: data[0].name,
          role_id: data[0].role_id,
        });
      } else {
        throw err;
      }
    })
    .catch((err) => {
      if (!err.code) {
        return res.status(400).json({ message: "Nama atau Password salah!" });
      } else {
        return res.status(400).json({ message: "Gagal Login!", error: err });
      }
    });
};

exports.register = (req, res, query) => {
  let errMsg = "Gagal Register";
  let errStatusCode = 500;
  let queryFindSimilar = `
    SELECT *
    FROM account
    WHERE name = '${req.name}'`;
  ExecuteSQL(queryFindSimilar)
    .then((db) => {
      const isExist = db.recordsets[0].length > 0;
      if (isExist) {
        errMsg = "Nama telah digunakan !";
        errStatusCode = 300;
        throw err;
      } else {
        ExecuteSQL(query)
          .then(() => {
            responseDataAuth(res, 200, "Berhasil Register");
          })
          .catch((errquery) => {
            console.log(1);
            return res.status(errStatusCode).json({
              message: errMsg,
              error: errquery,
            });
          });
      }
    })
    .catch((err) => {
      console.log(2);
      return res.status(errStatusCode).json({
        message: errMsg,
        error: err,
      });
    });
};
