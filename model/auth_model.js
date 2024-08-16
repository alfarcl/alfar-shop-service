const { pool } = require("../config/database");
const jwt = require("jsonwebtoken");
const { responseDataAuth } = require("../utils/responseHandler");

exports.login = async (req, res, query) => {
  try {
    const client = await pool.connect();
    const result = await client.query(query);
    const response = result.rows[0];
    if (response.id) {
      const payload = {
        id: response.id,
        name: response.name,
      };
      const secret = process.env.JWT_SECRET_KEY;
      const expiresIn = 60 * 60 * 10; // second * minute * hour (1 hour)
      const token = jwt.sign(payload, secret, { expiresIn: expiresIn });
      responseDataAuth(res, 200, "Berhasil Login", token, {
        id: response.id,
        name: response.name,
        role_id: response.role_id,
      });
    } else {
      res.status(404).json("Gagal menemukan data!");
    }
  } catch (err) {
    res.status(404).json("Gagal menemukan data!");
  }
};

exports.register = async (req, res, query) => {
  try {
    const client = await pool.connect();
    const result = await client.query(query);
    const response = result.rows;
    responseDataAuth(res, 200, "SUCCESS", response);
  } catch (err) {
    console.error({ err: err });
    res.status(404).json("Gagal menemukan data!");
  }
};
