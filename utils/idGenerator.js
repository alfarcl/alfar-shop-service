const { ExecuteSQL } = require("../config/database");

const generateId = (tableName, idName = "id") => {
  const query = `
    SELECT COUNT(${idName}) AS data
    FROM ${tableName}`;
  return new Promise((resolve, reject) => {
    ExecuteSQL(query)
      .then((db) => {
        switch (tableName) {
          case "account_role":
            resolve(`R000${db.recordset[0].data + 1}`);
            break;
          case "account":
            resolve(`AC00${db.recordset[0].data + 1}`);
            break;
          case "product":
            resolve(`P00${db.recordset[0].data + 1}`);
            break;
          case "product_category":
            resolve(`PC0${db.recordset[0].data + 1}`);
            break;
          case "product_variant":
            resolve(`PVX00${db.recordset[0].data + 1}`);
            break;
          case "trx":
            resolve(`TRX00${db.recordset[0].data + 1}`);
            break;
          case "trx_detail":
            resolve(`TRXDTL00${db.recordset[0].data + 1}`);
            break;
          default:
            reject(new Error("Invalid table name"));
        }
      })
      .catch((error) => reject(error));
  });
};

module.exports = { generateId };
