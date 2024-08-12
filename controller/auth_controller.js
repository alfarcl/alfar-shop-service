const { login, register } = require("../model/auth_model");
const { generateId } = require("../utils/idGenerator");
const now = new Date().toISOString();

exports.login = (request, result, next) => {
  const req = { ...request?.body };
  const query = `
  SELECT *
  FROM account
  WHERE name = '${req.name}' AND password = '${req.password}'`;
  login(req, result, query);
};

exports.register = async (request, result, next) => {
  const req = { ...request?.body };
  let id;
  await generateId("account").then((res) => (id = res));
  const query = `
      INSERT INTO account (id, name, password, role_id, created_date)
      VALUES ('${id}', '${req.name}', '${req.password}', '${req.role_id}', '${now}')`;
  register(req, result, query);
};
