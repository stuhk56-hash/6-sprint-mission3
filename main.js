import {
  getArticleList,
  getArticle,
  createArticle,
  patchArticle,
  deleteArticle
} from './ArticleService.js';

import {
  getProductList,
  getProduct,
  createProduct,
  patchProduct,
  deleteProduct
} from './ProductService.js';

class Product {
  constructor(name, description, price, tags, images) {
    this.name = name;
    this.description = description;
    this.price = price;
    this.tags = tags;
    this.images = images;
    this.favoriteCount = 0;
  }

  favorite() {
    this.favoriteCount += 1;
  }
}

class ElectronicProduct extends Product {
  constructor(name, description, price, tags, images, manufacturer) {
    super(name, description, price, tags, images);
    this.manufacturer = manufacturer;
  }
}

class Article {
  constructor(title, content, writer) {
    this.title = title;
    this.content = content;
    this.writer = writer;
    this.likeCount = 0;
    this.createdAt = new Date().toISOString();
  }

  like() {
    this.likeCount += 1;
  }
}

// ============================================
// 사용 예시
// ============================================

// 클래스 사용 예시
const product1 = new Product(
  "노트북",
  "고성능 노트북",
  1500000,
  ["전자제품", "컴퓨터"],
  ["image1.jpg"]
);
product1.favorite();
console.log("Product favoriteCount:", product1.favoriteCount); // 1

const electronicProduct1 = new ElectronicProduct(
  "스마트폰",
  "최신 스마트폰",
  1000000,
  ["전자제품", "모바일"],
  ["phone.jpg"],
  "Samsung"
);
console.log("ElectronicProduct manufacturer:", electronicProduct1.manufacturer);

const article1 = new Article(
  "첫 번째 게시글",
  "안녕하세요",
  "작성자"
);
article1.like();
console.log("Article likeCount:", article1.likeCount); // 1
console.log("Article createdAt:", article1.createdAt);

// API 함수 사용 예시
/*
// 아티클 리스트 조회
getArticleList(1, 10, "검색어")
  .then(articles => console.log("Articles:", articles))
  .catch(error => console.error(error));

// 아티클 생성
createArticle("제목", "내용", "image.jpg")
  .then(newArticle => console.log("Created article:", newArticle))
  .catch(error => console.error(error));

// 상품 리스트 조회 (ElectronicProduct 인스턴스로 변환됨)
getProductList(1, 10)
  .then(products => {
    console.log("Products:", products);
    products.forEach(p => {
      if (p instanceof ElectronicProduct) {
        console.log("전자제품:", p.name, p.manufacturer);
      }
    });
  })
  .catch(error => console.error(error));

// 상품 생성
createProduct("태블릿", "고성능 태블릿", 800000, ["전자제품"], ["tablet.jpg"])
  .then(newProduct => console.log("Created product:", newProduct))
  .catch(error => console.error(error));
*/