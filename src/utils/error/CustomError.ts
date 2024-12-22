export class CustomError extends Error {
  constructor(message: string) {
    super();
    this.message = message;
  }
}
