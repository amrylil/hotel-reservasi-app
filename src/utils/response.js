function successResponse(data, message = 'Success') {
  return {
    success: true,
    message,
    data,
  };
}

function errorResponse(message = 'Error', errors = []) {
  return {
    success: false,
    message,
    errors,
  };
}

module.exports = {
  successResponse,
  errorResponse,
};
