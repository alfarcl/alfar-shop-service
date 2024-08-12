const { ExecuteSQL } = require("../config/database");
const {
  responseData,
  responseDataInsert,
} = require("../utils/responseHandler");

exports.getProduct = (req, res, query) => {
  ExecuteSQL(query)
    .then((db) => {
      const data = db.recordsets[0];
      responseData(res, 200, "SUCCESS", data);
    })
    .catch((err) => {
      return res
        .status(500)
        .json({ message: "Gagal menemukan data!", error: err });
    });
};

exports.getProductById = (req, res, query) => {
  ExecuteSQL(query)
    .then((db) => {
      const data = db.recordsets[0];
      responseData(res, 200, "SUCCESS", data);
    })
    .catch((err) => {
      return res.status(500).json({
        message: `Gagal menemukan data dengan id (${req.id}) !`,
        error: err,
      });
    });
};

exports.insertProduct = (req, res, query) => {
  ExecuteSQL(query)
    .then(() => {
      responseDataInsert(res, 200, "Berhasil menambahkan data!");
    })
    .catch((err) => {
      return res
        .status(500)
        .json({ message: "Gagal menambahkan data!", error: err });
    });
};

exports.deleteProduct = (req, res, query) => {
  ExecuteSQL(query)
    .then(() => {
      responseDataInsert(res, 200, "Berhasil menghapus data!");
    })
    .catch((err) => {
      return res
        .status(500)
        .json({ message: "Gagal menghapus data!", error: err });
    });
};

exports.updateProduct = (req, res, query) => {
  let msg = "Gagal mengubah data!"
  ExecuteSQL(query)
    .then((db) => {
      if(db.rowsAffected[0] === 0) {
        msg="Tidak dapat menemukan data untuk diubah";
        throw err;
      };
      responseDataInsert(res, 200, "Berhasil mengubah data!");
    })
    .catch((err) => {
      return res
        .status(500)
        .json({ message: msg, error: err });
    });
};
