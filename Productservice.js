// 공부를 위해 product 관련 함수에서는 axios 사용
/* https://panda-market-api-crud.vercel.app/docs Product API를 이용하여 
아래 함수들을 구현해 주세요.
- async/await 을 이용하여 비동기 처리를 해주세요.
- 구현한 함수들을 아래와 같이 파일을 분리해 주세요.
-- export를 활용해 주세요.
-- ProductService.js 파일 Product API 관련 함수들을 작성해 주세요.
-- ArticleService.js 파일에 Article API 관련 함수들을 작성해 주세요.
- 이외의 코드들은 모두 main.js 파일에 import를 활용해서 작성해 주세요.
*/
import axios from "axios";
import { Product } from "./Product.js";
import {ElectronicProducts} from "./ElectronicProduct.js";

const instance = axios.create({
    baseURL: 'https://panda-market-api-crud.vercel.app',
    timeout: 5000
});

/* 🚨 getProductList() : GET 메소드를 사용해 주세요.
  -- page, pageSize, keyword 쿼리 파라미터를 이용해 주세요. */
export async function getProductList({page, pageSize, keyword}) {
    // - try/catch 를 이용하여 오류 처리를 해주세요.
    try {
        const res = await instance.get(`/products`, {
            params: {page, pageSize, keyword}
        });
        /* getProductList()를 통해서 받아온 상품 리스트를
        각각 인스턴스로 만들어(-> 인스턴스로 만들어= map 메소드 사용)
        products 배열에 저장해 주세요.
        - 해시태그에 "전자제품"이 포함되어 있는 상품들은 Product 클래스 대신
        ElectronicProduct 클래스를 사용해 인스턴스를 생성해 주세요.
        - 나머지 상품들은 모두 Product 클래스를 사용해 인스턴스를 생성해 주세요. */

        // 1. 위 res를 통해 갖고온 API 데이터 중에 실제 상품 리스트 배열을 가져오고
        const productList = res.data.list; //res.data;

        //2. map 메서드를 통해 각 상품(item)을 Product 클래스의 인스턴스로 변환한다.
        const products = productList.map(item => {
            //여기서 foreach 말고 map 쓰는 게 맞나?
            if (item.tags.includes("전자제품") || item.tags.includes("전자 제품")) {
                return new ElectronicProducts(
                    item.name,
                    item.description,
                    item.price,
                    item.tags,
                    item.images,
                    item.favortieCount,
                    item.manufacturer
                );
            } else {
                return new Product(
                    item.name,
                    item.description,
                    item.price,
                    item.tags,
                    item.imgaes,
                    item.favortieCount
                );
            }
        });
        //3. 인스턴스들로 구성된 최종 배열 반환
        return products;
    } catch (error) {
        console.log("getProdL err.stat: ", error.response.status);
        return error.response.data;
    };

// 🚨 getProduct() : GET 메소드를 사용해 주세요.
    export async function getProduct(productId) {
        try {
            const response = await instance.get(`/products/${productId}`,)
            return response.data;
        } catch (error) {
            cconsole.log("getProd err.stat: ", error.response.status);
            return error.response.data;
        };
    }

// 🚨 createProduct() : POST 메소드를 사용해 주세요.
// - request body에 {name, description, price, tags, images} 를 포함해 주세요.
    export async function createProduct({name, description, price, tags, images}) {
        const newProduct = {name, description, price, tags, images};

        try {
            const res = await instance.post(`/products`, newProduct);
            return res.data;
        } catch (error) {
            console.log("creatPd err.stat: ", error.response.status);
            return error.response.data;
        };
    }

// 🚨 patchProduct() : PATCH 메소드를 사용해 주세요.
    export async function patchProduct(productId, updates) {
        try {
            const res = await instance.patch(`/products/${productId}`, updates);
            return res.data;
        } catch (error) {
            console.log("patPd err.stat: ", error.response.status);
            return error.response.data;
        }
    }

// 🚨 deleteProduct() : DELETE 메소드를 사용해 주세요.
    export async function deleteProduct(productId) {
        try {
            const res = await instance.delete(`/products/${productId}`);
            return res.data;
        } catch (error) {
            console.log("deltPd err.stat: ", error.response.status);
            return error.response.data;
        }
    }
}