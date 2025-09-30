import Product from './Product.js';
import ElectronicProduct from './ElectronicProduct.js';
import Article from './Article.js';
import {
  createArticle,
  getArticle,
  getArticleList,
  patchArticle,
  deleteArticle,
} from './ArticleService.js';

const powerNeo = new ElectronicProduct(
  '네오 건전지',
  '평범한 건전지이다...',
  5500,
  [],
  [],
  0
);

console.log('=====테스트 시작=====');

/* ----------------고양이 포스트하기----------------------
const articleData = {
  title: '고양이',
  content: '고양이',
  image:
    'https://images.mypetlife.co.kr/content/uploads/2022/05/27120923/52041878798_acf34e8861_b.jpg',
};
createArticle(articleData).then((createdArticle) => {
  // 성공 시 게시글 아이디 얻어오기
  console.log(`성공! ID: ${createdArticle.id}`);
});
*/

//-------------- 포스트 한것 구하기--------------4715, 4718
// getArticle(id);

//--------------리스트 가져오기--------------
// getArticleList(1, 10, '고양이');

// ---------------patch-----------------4718
const articleData = {
  title: '하얀 고양이',
  content: '하얀 고양이',
  image:
    'https://images.freeimages.com/images/large-previews/bf0/sleepy-cat-x-1504754.jpg?h=350',
};
patchArticle(4718, articleData);

//-----------------delete--------------4718
