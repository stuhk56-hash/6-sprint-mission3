

import { getArticleList, getArticle, createArticle, patchArticle, deleteArticle } from "./ArticleService.js";
import { getProductList, getProduct, createProduct, patchProduct, deleteProduct } from "./ProductService.js";


class Product {
  #favoriteCount // #favoriteCount를 private으로 숨김
  
  constructor(name, description, price, tags, images, favoriteCount=0) {
    this.name = name
    this.description = description,
    this.price = price,
    this.tags = tags,
    this.images = images,
    this.#favoriteCount = favoriteCount
  }
  product() {
    this.#favoriteCount += 1
  }
}

class ElectronicProduct extends Product{
  #manufacturer // #manufacturer을 private으로 숨김
  constructor(name, description, price, tags, images, favoriteCount=0, manufacturer="") {
    super(name, description, price, tags, images, favoriteCount)
    this.#manufacturer = manufacturer
  }
}

class Article { //질문 : createdAt을 생성자의 파라미터로 빼야되는지 궁금합니다.
  #likeCount
  constructor(title, content, writer, likeCount, createdAt) { // 질문 1번
    this.title = title,
    this.content = content,
    this.writer = writer,
    this.#likeCount = likeCount,
    this.createdAt = new Date();
  }

  like() {
    this.#likeCount +=1
  }
}


// // ================================================

// createArticle (데이터를 만드는 POST 메소드 코드)
// image에 "https://" 붙여야됨
const articleData = {
  image: "https://park.img", 
  content: "박지성 맨유 이적 확실시",
  title: "박지성 맨유 데뷔 임박."
}

try {
  const data = await createArticle(articleData)
  console.log(data)
} catch(error) {
  console.log(error)
}



// getArticleList (paramsAricle를 인자로 넣는 GET 메소드 코드) 
const paramsArticle = {
  page: 1,
  pageSize: 10,
  keyword:"손흥민"
}

try {
  const data = await getArticleList(paramsArticle)
  console.log(data)
} catch(error) {
  console.log(error)
}



// getArticle  (id값을 인자로 넣는 GET 메소드 코드)
try {
  const data = await getArticle(4841)
  console.log(data)
} catch(error) {
  console.log(error.message)
}



// patchAricle //(데이터 수정하는 PATCH 메소드 코드)
const patchDataArt = {
  image: "https://sonny2.img",
  content: "손흥민 LA겔럭시 이적 확정 관련 내용",
  title: "손흥민 LA겔럭시 입성"
}

try {
  const data = await patchArticle(4841, patchDataArt)
  console.log(data)
} catch(error) {
  console.log(error)
}



// deleteArticle (데이터를 삭제하는 DELETE 메소드 코드)
try {
  const data = await deleteArticle(4841)
  console.log(data)
} catch(error) {
  console.log(error)
}


//=====================================================================

// createProduct (데이터를 만드는 POST 메소드 코드)
// image에 "https://" 붙여야됨, image, tags []로 감싸야됨.

const productData = {
  name: "마우스zz",
  description: "컴퓨터 입력도구",
  price: "18000",
  tags: ["전자제품"], 
  images: ["https://mouse.jpg"], 
}

try {
  const data = await createProduct(productData)
  console.log(data)

} catch(error) {
  console.log(error)
}



// getProductList (paramsProduct를 인자로 넣는 GET 메소드 코드)
const paramsProduct = {
  page: 1,
  pageSize: 10,
  keyword: "zz",
}

const products = []
try{
  const data = await getProductList(paramsProduct)
  
  for (let i=0; i<data.list.length; i++) {
    // splice(i(위치), 0(삭제할 요소 개수) , 넣을 값)
    if (data.list[i].tags=="전자제품") {
      products.splice(i,0,new ElectronicProduct(data.list[i].name, data.list[i].description, data.list[i].price,
      data.list[i].tags, data.list[i].images))  

    } else {
    products.splice(i,0,new Product(data.list[i].name, data.list[i].description, data.list[i].price,
      data.list[i].tags, data.list[i].images
     ))}
  }
  console.log(data) // Swagger UI랑 똑같이 출력되게 해야한다. 현재는 tags, image가 [Array]로 나옴.
  // console.log(data.list)
  // console.log(products) // products에 인스턴스 들어왔음을 확인  
} catch(error) {
  console.log(error)
}



// getProduct (id값을 인자로 넣는 GET 메소드 코드)
try {
  const data = await getProduct(2366)
  console.log(data)

} catch(error) {
  console.log(error)
}



// patchProduct //(데이터 수정하는 PATCH 메소드 코드)
const patchDataPro = {
  name: "TVzz",
  description: "SAMSUNG TV",
  price: "2500000",
  tags: "전자제품",
  images: "https://image111444.jpg",
}

try {
  const data = await patchProduct(2366, patchDataPro)
  console.log(data)

} catch(error) {
  console.log(error)
}



// deleteProduct (데이터를 삭제하는 DELETE 메소드 코드)
try {
  const data = await deleteProduct(2254)
  console.log(data)

} catch(error) {
  console.log(error)
} 

