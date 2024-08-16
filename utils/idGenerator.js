const { pool } = require("../config/database");

const generateId = (tableName, idName = "id") => {
  const query = `
    SELECT COUNT(${idName}) AS data
    FROM ${tableName}`;
  return new Promise(async (resolve, reject) => {
    try {
      const client = await pool.connect();
      const result = await client.query(query);
      const id = parseInt(result?.rows[0].data) + 1;
      switch (tableName) {
        case "account_role":
          resolve(`R000${id}`);
          break;
        case "account":
          resolve(`AC00${id}`);
          break;
        case "product":
          resolve(`P00${id}`);
          break;
        case "product_category":
          resolve(`PC0${id}`);
          break;
        case "product_variant":
          resolve(`PVX00${id}`);
          break;
        case "trx":
          resolve(`TRX00${id}`);
          break;
        case "trx_detail":
          resolve(`TRXDTL00${id}`);
          break;
        case "cart":
          resolve(`CRT${id}`);
          break;
        default:
          reject(new Error("Invalid table name"));
      }
    } catch (err) {
      reject(err);
    }
  });
};

module.exports = { generateId };
