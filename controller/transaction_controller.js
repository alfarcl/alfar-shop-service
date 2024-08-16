const {
  getData,
  getDataById,
  insertData,
  deleteData,
  updateData,
} = require("../model/transaction_model");
const { generateId } = require("../utils/idGenerator");
const now = new Date().toISOString();
const tableName = "trx";

exports.getData = (request, result, next) => {
  const req = { ...request?.body };
  const query = `
      SELECT * 
      FROM ${tableName}`;
  getData(req, result, query);
};

exports.getDataById = (request, result, next) => {
  const req = { ...request?.body };
  const query = `
      SELECT * 
      FROM ${tableName}
      WHERE id = '${req.transaction_id}'`;
  getDataById(req, result, query);
};

exports.insertData = async (request, result, next) => {
  const req = { ...request?.body };
  let id;
  await generateId(tableName).then((val) => {
    id = val;
  });
  const reqPayload = `
    '${req.total_amount}',
    '${req.is_active}',
    '${req.created_user}'
  `;
  const query = `
      INSERT INTO ${tableName} (id, transaction_no, total_amount, active, created_user, created_date)
      VALUES ('${id}', 'TRXNO${id}', ${reqPayload}, '${now}');
    `;
  insertData(req, result, query);
};

exports.deleteData = (request, result, next) => {
  const req = { ...request?.body };
  const query = `
      DELETE FROM ${tableName} 
      WHERE id='${req.transaction_id}';`;
  deleteData(req, result, query);
};

exports.updateData = (request, result, next) => {
  const req = { ...request?.body };
  const query = `
      UPDATE ${tableName}
      SET transaction_no=${req.transaction_no}, total_amount=${req.total_amount}, active=${req.active}, updated_user=${req.updated_user}, updated_date=${now}
      WHERE id = '${req.transaction_id}';
    `;

  updateData(req, result, query);
};
