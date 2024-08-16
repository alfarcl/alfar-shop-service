const { pool } = require("../config/database");
const {
  responseData,
  responseDataInsert,
} = require("../utils/responseHandler");

exports.getProduct = async (req, res, query) => {
  try {
    const client = await pool.connect();
    const result = await client.query(query);
    const response = result.rows;
    responseData(res, 200, "SUCCESS", response);
  } catch (err) {
    return res
      .status(404)
      .json({ message: "Gagal menemukan data!", error: err });
  }
};

exports.getProductById = async (req, res, query) => {
  try {
    const client = await pool.connect();
    const result = await client.query(query);
    const response = result.rows;
    responseData(res, 200, "SUCCESS", response);
  } catch (err) {
    return res
      .status(404)
      .json({ message: "Gagal menemukan data!", error: err });
  }
};

exports.insertProduct = async (req, res, query) => {
  const client = await pool.connect();
  const result = await client.query(query);
  if (result.rowCount) {
    responseDataInsert(res, 200, "Berhasil menambahkan data!");
  } else {
    return res
      .status(404)
      .json({ message: "Gagal menambahkan data!", error: err });
  }
};

exports.deleteProduct = async (req, res, query) => {
  try {
    const client = await pool.connect();
    const result = await client.query(query);
    responseDataInsert(res, 200, "Berhasil menghapus data!");
  } catch (err) {
    return res
      .status(404)
      .json({ message: "Gagal menghapus data!", error: err });
  }
};

exports.updateProduct = async (req, res, query) => {
  try {
    const client = await pool.connect();
    const result = await client.query(query);
    responseDataInsert(res, 200, "Berhasil mengedit data!");
  } catch (err) {
    return res
      .status(404)
      .json({ message: "Gagal mengedit data!", error: err });
  }
};
