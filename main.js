import {
  getArticleList,
  getArticle,
  createArticle,
  patchArticle,
  deleteArticle,
} from "./ArticleService.js";

import {
  getProductList,
  getProduct,
  createProduct,
  patchProduct,
  deleteProduct,
} from "./ProductService.js";

import { Product } from "./product.js";
import { ElectronicProduct } from "./electronicProduct.js";

getArticleList(1, 10);

getArticle(5036);

createArticle("이건 예시입니다", "이건 예시입니다.", "https://image.com");

patchArticle(5036, "고쳐볼게유", "고쳐볼게요", "http://patch.com");

deleteArticle(5036);

console.log(await getProductList(1, 10));

console.log(await getProduct(2536));

console.log(
  await createProduct(
    "상품 이름",
    "이것은 테스트3 yj",
    1000,
    "전자제품",
    "http://image.com"
  )
);

console.log(
  await patchProduct(
    2554,
    "이름 바꾸기",
    "내용 바꾸기 jy",
    5000,
    "일반제품",
    "http://image.com"
  )
);

deleteProduct(2554);
console.log(await getProduct(2554));

//전자제품 분리
let products = [];
const list = await getProductList(1, 10, "yj");

console.log(list);
for (let i of list.list) {
  let product;
  if (i.tags.includes("전자제품")) {
    product = new ElectronicProduct(i);
  } else {
    product = new Product(i);
  }
  products.push(product);
}
console.log(products);
