export class Product {
  #name;

  #description;

  #price;

  #tags;

  #images;

  #favoriteCount;

  constructor(name, description, price, tags, images, favoriteCount) {
    this.#name = name;
    this.#description = description;
    this.#price = price;
    this.#tags = tags;
    this.#images = images;
    this.#favoriteCount = 0;
  }

  getNmae() {
    return this.#name;
  }

  getDescription() {
    return this.#description;
  }

  getPrice() {
    return this.#price;
  }

  getTags() {
    return this.#tags;
  }

  getImages() {
    return this.#images;
  }

  getFavoriteCount() {
    return this.#favoriteCount;
  }

  favorite() {
    this.#favoriteCount += 1;
  }
}
