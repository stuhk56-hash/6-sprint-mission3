import {
  getArticle,
  getArticleList,
  createArticle,
  patchArticle,
  deleteArticle,
} from "./services/ArticleService.js";
import {
  getProduct,
  getProductList,
  createProduct,
  patchProduct,
  deleteProduct,
} from "./services/ProductService.js";
import { Article } from "./models/Article.js";
import { Product } from "./models/Product.js";
import { ElectronicProduct } from "./models/ElectronicProduct.js";

async function productInstance() {
  const list = await getProductList();
  const products = list.map((item) => {
    if (item.tags.includes("전자제품")) {
      return new ElectronicProduct(
        item.name,
        item.description,
        item.price,
        item.tags ?? [],
        item.images ?? [],
        item.favoriteCount ?? 0,
        item.manufacturer ?? ""
      );
    } else {
      return new Product(
        item.name,
        item.description,
        item.price,
        item.tags ?? [],
        item.images ?? [],
        item.favoriteCount ?? 0
      );
    }
  });
  console.log(products);
}

productInstance();
