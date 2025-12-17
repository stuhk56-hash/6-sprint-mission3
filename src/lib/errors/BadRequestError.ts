export default class BadRequestError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'BadRequestError';
  
  // Error 상속 시 프로토타입 보정
  Object.setPrototypeOf(this, BadRequestError.prototype);
  }
}


