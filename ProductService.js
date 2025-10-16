import { Product } from "./product.js";
import { ElectronicProduct } from "./electronicProduct.js";

//getProductList()
export async function getProductList(page, pageSize, keyword = "") {
  let res;
  try {
    //console.log('fetch전');
    const url = new URL("https://panda-market-api-crud.vercel.app/products");
    url.searchParams.append("page", page);
    url.searchParams.append("pageSize", pageSize);
    if (keyword) url.searchParams.append("keyword", keyword);

    res = await fetch(url);
  } catch (e) {
    console.error(e);
    throw new Error("네트워크 전송 오류");
  }
  if (!res.ok) {
    throw new Error("생성 오류 발생");
  }
  //console.log('fetch 후');
  let data;
  try {
    data = await res.json();
    //console.log('출력');
    return data;
  } catch (e) {
    console.error(e);
    throw new Error("파싱 오류");
  } finally {
    console.log("실행 완료");
  }
}

//getProduct()
export async function getProduct(id) {
  let res;
  try {
    res = await fetch(
      `https://panda-market-api-crud.vercel.app/products/${id}`
    );
  } catch (e) {
    console.error(e);
    throw new Error("네트워크 전송 오류");
  }
  if (!res.ok) {
    throw new Error("생성 오류 발생");
  }

  let data;
  try {
    data = await res.json();
    return data;
  } catch (e) {
    console.error(e);
    throw new Error("파싱 오류");
  } finally {
    console.log("실행 완료");
  }
}

//createProduct()
export async function createProduct(name, description, price, tags, images) {
  let res;
  try {
    res = await fetch(`https://panda-market-api-crud.vercel.app/products`, {
      method: "POST",
      body: JSON.stringify({
        name: name,
        description: description,
        price: price,
        tags: tags,
        images: images,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (e) {
    console.error(e);
    throw new Error("네트워크 전송 오류");
  }
  if (!res.ok) {
    throw new Error("생성 오류 발생");
  }

  let data;
  try {
    data = await res.json();
    return data;
  } catch (e) {
    console.error(e);
    throw new Error("파싱 오류");
  } finally {
    console.log("실행 완료");
  }
}

//patchProduct()
export async function patchProduct(id, name, description, price, tags, images) {
  let res;
  try {
    res = await fetch(
      `https://panda-market-api-crud.vercel.app/products/${id}`,
      {
        method: "PATCH",
        body: JSON.stringify({
          name: name,
          description: description,
          price: price,
          tags: tags,
          images: images,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (e) {
    console.error(e);
    throw new Error("네트워크 전송 오류");
  }
  if (!res.ok) {
    throw new Error("생성 오류 발생");
  }
  let data;
  try {
    data = await res.json();
    return data;
  } catch (e) {
    console.error(e);
    throw new Error("파싱 오류");
  } finally {
    console.log("실행 완료");
  }
}

//deleteProduct
export async function deleteProduct(id) {
  let res;
  try {
    res = await fetch(
      `https://panda-market-api-crud.vercel.app/products/${id}`,
      {
        method: "DELETE",
      }
    );
  } catch (e) {
    console.error(e);
    throw new Error("네트워크 전송 오류");
  }
  if (!res.ok) {
    throw new Error("생성 오류 발생");
  }
  let data;
  try {
    data = await res.json();
    return data;
  } catch (e) {
    console.error(e);
    throw new Error("파싱 오류");
  } finally {
    console.log("실행 완료");
  }
}
