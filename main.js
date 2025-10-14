import {
    getArticleList, getArticle, createArticle, patchArticle, deleteArticle
} from './ArticleService.js'
import { createProduct, deleteProduct, getProduct, getProductList, patchProduct } from './Productservice.js';

getArticleList({ page: 1, pageSize: 5, keyword: 'Post' })
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.error(error);
    })

getArticle(4918)
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.error(error);
    })

createArticle({
    title: 'New Post Title',
    content: 'Content of the article.',
    image: 'https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTEwL3JtNDY3YmF0Y2gyLXN0YXItMDAxXzEucG5n.png'
})
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.error(error);
    })

patchArticle(4918, { title: 'Updated Title' })
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.error(error);
    })

deleteArticle(4915)
    .then(data => {
        console.log(data);
        // return data; return만 넣었더니 콘솔에 undefined고 뭐고 아무것도 뜨지 않음 251002 12:47
    })
    .catch(error => {
        console.error(error);
    })


// ========== ProductService ===========
let data = await getProductList({page:1, pageSize:5, keyword:''});
let data22 = await getProduct(2460);
let data33 = await createProduct({name: '버티컬마우스', description:'2025ver', price:1000000, tags:"전자제품", images:`https://placehold.co/200x200`});
let data4 = await patchProduct(2484, {tags: ["전자제품", "사무용품"]});
let data5 = await deleteProduct(2482);

console.log(`========== Call productService functions ==========`);
console.log(data);  //data 출력 잘 됨 8:02 251002
console.log(data22);
console.log(data33);  // data33 출력 잘 됨 22:50 251009
console.log(data4);
console.log(data5); // data4, 5 출력 확인 완료 22:55 251009