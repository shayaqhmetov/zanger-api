export default class AppError extends Error {
  private statusCode: number;

  constructor(statusCode: number, message: string) {
    super(message);

    Object.setPrototypeOf(this, new.target.prototype);
    this.name = Error.name;
    this.statusCode = statusCode;
    Error.captureStackTrace(this);
  }

  public getStatusCode() {
    return this.statusCode;
  }

  public getMessage() {
    return this.message;
  }
}