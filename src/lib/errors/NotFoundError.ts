type ModelName = 'User' | 'Post' | 'Product' | 'Comment';

export default class NotFoundError extends Error {
  constructor(modelName: ModelName, id: string | number) {
    super(`${modelName} with id ${id} not found`);
    this.name = 'NotFoundError';
  }
}