import axios from 'axios';
import Product from './Product';

const baseURL = `https://panda-market-api-crud.vercel.app`; // /products/   ${baseURL}/products

/*
getProductList()
getProduct()
createProduct()
patchProduct()
deleteProduct()


*/
//==========겟 프로덕트 리스트=======
export async function getProductList(page, pageSize, keyword) {
  try {
    const response = await axios.get(`${baseURL}/products`, {
      params: {
        page,
        pageSize,
        keyword,
      },
    });
    const productData = response.data;
    return productData; //다른곳에서 쓸 수 있게 리턴해준다. ?
  } catch (error) {
    console.error(`실패!!! : ${error.message}`);
    console.log(`에러 코드: ${error.response.status}`);
    console.log(`에러 내용: ${error.response.data}`);
  } finally {
    console.log(`======겟 프로덕트 테스트 완료======`);
  }
}
