class ApiError {
  constructor(code, message, err) {
    this.code = code;
    this.message = message;
    this.err = err;
  }

  // 400 Bad Request
  static badRequest(msg) {
    return new ApiError(400, `Bad Request: ${msg}`);
  }

  // 401 Bad Request
  static notAuthRequest(msg) {
    return new ApiError(401, `Not authorized: ${msg}`);
  }

  // 404 Not Found
  static notFound() {
    return new ApiError(404, `404 Not Found`);
  }

  // 500 Internal Server Error
  static internal(msg, err) {
    console.error(err);
    return new ApiError(500, `Internal Server Error: ${msg}`);
  }
}

module.exports = ApiError;
