const responseData = (
  response,
  statusCode,
  message,
  values,
  limit = 0,
  offset = 0
) => {
  let data = {
    message: message,
    payload: {
      data: values,
    },
    status_code: statusCode,
    total_data: values.length,
    limit: limit,
    offset: offset,
  };
  response.status(statusCode).json(data);
};

const responseDataInsert = (response, statusCode, message) => {
  let data = {
    message: message,
    status_code: statusCode,
  };
  response.status(statusCode).json(data);
};

const responseDataLogin = (response, statusCode, message, token, values) => {
  let data = {
    message: message,
    payload: {
      token: token,
      data: values,
    },
    status_code: statusCode,
  };
  response.status(statusCode).json(data);
};

const responseDataAuth = (response, statusCode, message, token, val) => {
  let data = {
    message: message,
    payload: {
      token: token,
      data: val,
    },
    status_code: statusCode,
  };
  response.status(statusCode).json(data);
};

module.exports = { responseData, responseDataInsert, responseDataAuth, responseDataLogin };
