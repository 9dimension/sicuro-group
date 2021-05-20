class HttpError extends Error {
  statusCode;

  constructor(message, code, name) {
    super(message);
    this.name = name || "SERVER_ERROR";
    this.statusCode = code || 500;
  }
}

class EmailExist extends HttpError {
  constructor(message) {
    super(message, 400, "EMAIL_ALREADY_EXISTS");
  }
}

class EmailNotExists extends HttpError {
  constructor(message) {
    super(message, 400, "EMAIL_NOT_FOUND");
  }
}

class NotFound extends HttpError {
  constructor(message) {
    super(message, 404, "NOT_FOUND");
  }
}

class CredentialsNotMatched extends HttpError {
  constructor(message = "Your Credentials not matched") {
    super(message, 400, "CREDENTIALS_NOT_MATCHED");
  }
}

class ValidationError extends HttpError {
  errors;

  constructor(message, errors = []) {
    super(message, 422, "VALIDATION_ERROR");
    this.errors = errors;
  }
}

class AccessDenied extends HttpError {
  constructor(message = "Access Denied") {
    super(message, 401, "ACCESS_DENIED");
  }
}

class LoginFailed extends AccessDenied {
  constructor(message = "Login Failed") {
    super(message);
  }
}

class BadRequset extends HttpError {
  constructor(message = "Bad Requset") {
    super(message, 400, "BAD_REQUEST");
  }
}

class EmailExpire extends HttpError {
  constructor(message) {
    super(message, 406, "EMAIL_EXPIRE");
  }
}

module.exports = {
  HttpError,
  EmailExist,
  CredentialsNotMatched,
  ValidationError,
  NotFound,
  AccessDenied,
  LoginFailed,
  EmailNotExists,
  BadRequset,
  EmailExpire,
};
