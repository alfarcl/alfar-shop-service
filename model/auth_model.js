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
      const expiresIn = 60 * 60 * 10; // seconds * minutes * hour (1 hour)
      const token = jwt.sign(payload, secret, { expiresIn: expiresIn });
      responseDataAuth(res, 200, "Berhasil Login", token, {
        id: response.id,
        name: response.name,
        role_id: response.role_id,
      });
    } else {
      throw new Error("User not found"); // Specific error message
    }
  } catch (err) {
    console.error({ err: err });

    if (err.message) {
      // Check for Vercel-specific error codes if available
      // Handle Vercel errors here (e.g., display user-friendly message)
      res.status(400).json({ message: "User not found" });
    } else {
      res.status(500).json({ message: "Internal server error" }); // Generic error for unexpected issues
    }
  }
};

exports.register = async (req, res, query) => {
  try {
    const client = await pool.connect();
    const result = await client.query(query);
    const response = result.rows;
    responseDataAuth(res, 200, "SUCCESS", response);
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};
