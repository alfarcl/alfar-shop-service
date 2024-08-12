const {
  getProduct,
  getProductById,
  insertProduct,
  deleteProduct,
  updateProduct,
} = require("../model/product_model");
const { generateId } = require("../utils/idGenerator");
const now = new Date().toISOString();
const tableName = "product";

exports.getData = (request, result, next) => {
  const req = { ...request?.body };
  const query = `
      SELECT * 
      FROM ${tableName}
    `;

  getProduct(req, result, query);
};

exports.getDataById = (request, result, next) => {
  const req = { ...request?.body };
  const query = `
      SELECT * 
      FROM ${tableName}
      WHERE id = '${req.product_id}'`;
  getProductById(req, result, query);
};

exports.insertProduct = async (request, result, next) => {
  const req = { ...request?.body };
  let id;
  await generateId(tableName).then((val) => {
    console.log({ val: val });
    id = val;
  });
  const reqPayload = ` 
      '${req.plu}', 
      '${req.name}', 
      '${req.product_category_id}', 
      '${req.is_active}',
      '${req.created_user}'`;
  const query = `
      INSERT INTO ${tableName} (id, plu, name, product_category_id, active, created_user, created_date)
      VALUES ('${id}', ${reqPayload}, '${now}');
    `;

  insertProduct(req, result, query);
};

exports.deleteProduct = (request, result, next) => {
  const req = { ...request?.body };
  const query = `
      DELETE FROM ${tableName} WHERE id='${req.product_id}';
    `;

  deleteProduct(req, result, query);
};

exports.updateProduct = (request, result, next) => {
  const req = { ...request?.body };
  const query = `
      UPDATE ${tableName}
      SET plu = '${req.plu}', name = '${req.name}', product_category_id = '${req.product_category_id}', active = '${req.is_active}', updated_user = '${req.updated_user}', updated_date =  '${now}'
      WHERE id = '${req.product_id}';
    `;

  updateProduct(req, result, query);
};
