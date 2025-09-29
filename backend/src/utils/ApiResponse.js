// Custom API Response class
class ApiResponse {
  constructor(statusCode, data = null, message = 'Success', success = true) {
    this.statusCode = statusCode;
    this.success = success;
    this.message = message;
    this.data = data;
    this.timestamp = new Date().toISOString();
  }
}

module.exports = ApiResponse;
