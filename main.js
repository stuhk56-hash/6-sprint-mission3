import Product from './Product.js';
import ElectronicProduct from './ElectronicProduct.js';
import Article from './Article.js';
import { getArticleList } from './ArticleService.js';

const laptop = new ElectronicProduct(
  '건전지',
  '평범한 건전지이다...',
  5500,
  [],
  [],
  0
);

console.log('=====테스트 시작=====');
console.log(laptop.name);
console.log(laptop.description);
console.log(`찜하기 수: ${laptop.favorite()}`);
console.log(`찜하기 수: ${laptop.favorite()}`);
getArticleList(1, 1, ''); // getArticleList 테스트
// getArticle(1); // getArticle 테스트
// console.log('=====테스트 완료=====');
