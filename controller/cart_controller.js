const {
  getData,
  getDataById,
  insertData,
  deleteData,
  updateData,
} = require("../model/cart_model");
const { generateId } = require("../utils/idGenerator");
const now = new Date().toISOString();
const tableName = "cart";

exports.getData = (request, result, next) => {
  const req = { ...request?.body };
  const query = `
      SELECT * 
      FROM ${tableName}
      ORDER BY id
      `;
  getData(req, result, query);
};

exports.getDataById = (request, result, next) => {
  const req = { ...request?.body };
  const query = `
      SELECT * 
      FROM ${tableName}
      WHERE id = '${req.cart_id}'
      ORDER BY id
      `;
  getDataById(req, result, query);
};

exports.insertData = async (request, result, next) => {
  const req = { ...request?.body };
  let id;
  await generateId(tableName).then((val) => {
    id = val;
  });
  const reqPayload = `
    '${req.account_id}',
    '${req.is_active}',
    '${req.price}',
    '${req.product_name}',
    '${req.product_variant_id}',
    '${req.qty}'
  `;
  const query = `
      INSERT INTO ${tableName} (id, account_id, active, price, product_name, product_variant_id, qty)
      VALUES ('${id}', ${reqPayload});
    `;
  insertData(req, result, query);
};

exports.deleteData = (request, result, next) => {
  const req = { ...request?.body };
  const query = `
      DELETE FROM ${tableName} 
      WHERE id='${req.cart_id}';`;
  deleteData(req, result, query);
};

exports.updateData = (request, result, next) => {
  const req = { ...request?.body };
  const query = `
      UPDATE ${tableName}
      SET active=${req.is_active}, qty=${req.qty}
      WHERE id = '${req.cart_id}';
    `;

  updateData(req, result, query);
};
