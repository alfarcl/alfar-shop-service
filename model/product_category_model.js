const { pool } = require("../config/database");
const {
  responseData,
  responseDataInsert,
} = require("../utils/responseHandler");

exports.getProduct = async (req, res, query) => {
  try {
    const client = await pool.connect();
    try {
      const result = await client.query(query);

      if (result.rows.length > 0) {
        const response = result.rows;
        responseData(res, 200, "SUCCESS", response); // Assuming responseData is defined
      } else {
        res.status(404).json({ message: "Gagal menemukan data!" });
      }
    } catch (err) {
      console.error("Error executing query:", err);
      res.status(500).json({ message: "Internal server error", error: err });
    } finally {
      client.release();
    }
  } catch (err) {
    console.error("Error connecting to database:", err);
    res.status(500).json({ message: "Database connection error", error: err });
  }
};

exports.getProductById = async (req, res, query) => {
  try {
    const client = await pool.connect();
    try {
      const result = await client.query(query);

      if (result.rows.length > 0) {
        const response = result.rows;
        responseData(res, 200, "SUCCESS", response); // Assuming responseData is defined
      } else {
        res.status(404).json({ message: "Gagal menemukan data!" });
      }
    } catch (err) {
      console.error("Error executing query:", err);
      res.status(500).json({ message: "Internal server error", error: err });
    } finally {
      client.release();
    }
  } catch (err) {
    console.error("Error connecting to database:", err);
    res.status(500).json({ message: "Database connection error", error: err });
  }
};

exports.insertProduct = async (req, res, query) => {
  try {
    const client = await pool.connect();
    const result = await client.query(query);
    responseDataInsert(res, 200, "Berhasil menambahkan data!");
  } catch (err) {
    console.error(err); // Log the error for debugging

    if (err instanceof PoolError) {
      // Handle pool connection errors
      return res.status(500).json({ message: "Error connecting to database" });
    } else if (err instanceof QueryError) {
      // Handle query execution errors
      return res.status(500).json({ message: "Error executing query" });
    } else {
      // Handle other unexpected errors
      return res.status(500).json({ message: "Internal server error" });
    }
  }
};

exports.deleteProduct = async (req, res, query) => {
  try {
    const client = await pool.connect();
    const result = await client.query(query);
    responseDataInsert(res, 200, "Berhasil menghapus data!");
  } catch (err) {
    console.error(err); // Log the error for debugging

    if (err instanceof PoolError) {
      // Handle pool connection errors
      return res.status(500).json({ message: "Error connecting to database" });
    } else if (err instanceof QueryError) {
      // Handle query execution errors
      return res.status(500).json({ message: "Error executing query" });
    } else {
      // Handle other unexpected errors
      return res.status(500).json({ message: "Internal server error" });
    }
  }
};

exports.updateProduct = async (req, res, query) => {
  try {
    const client = await pool.connect();
    const result = await client.query(query);
    responseDataInsert(res, 200, "Berhasil mengedit data!");
  } catch (err) {
    console.error(err); // Log the error for debugging

    if (err instanceof PoolError) {
      // Handle pool connection errors
      return res.status(500).json({ message: "Error connecting to database" });
    } else if (err instanceof QueryError) {
      // Handle query execution errors
      return res.status(500).json({ message: "Error executing query" });
    } else {
      // Handle other unexpected errors
      return res.status(500).json({ message: "Internal server error" });
    }
  }
};
