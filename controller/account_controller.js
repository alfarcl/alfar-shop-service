const {
  getData,
  getDataById,
  insertData,
  deleteData,
  updateData,
} = require("../model/account_model");
const { generateId } = require("../utils/idGenerator");
const now = new Date().toISOString();
const tableName = "account";

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
      WHERE id = '${req.account_id}'`;
  getDataById(req, result, query);
};

exports.insertData = async (request, result, next) => {
  const req = { ...request?.body };
  let id;
  await generateId(tableName).then((val) => {
    console.log({ val: val });
    id = val;
  });
  const query = `
      INSERT INTO ${tableName} (id, name, role_id, created_date)
      VALUES ('${id}', '${req.name}', '${req.role_id}', '${now}');
    `;

  insertData(req, result, query);
};

exports.deleteData = (request, result, next) => {
  const req = { ...request?.body };
  const query = `
      DELETE FROM ${tableName} 
      WHERE id='${req.account_id}';`;

  deleteData(req, result, query);
};

exports.updateData = (request, result, next) => {
  const req = { ...request?.body };
  const query = `
      UPDATE ${tableName}
      SET name = '${req.name}', role_id = '${req.role_id}', updated_date = '${now}'
      WHERE id = '${req.account_id}';
    `;

  updateData(req, result, query);
};
