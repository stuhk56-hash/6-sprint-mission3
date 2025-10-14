// In JS, the class recommended in seperate js files.
//JS에서는 클래스를 각각 다른 파일에 저장해서 사용하길 권장한다.
import { Product } from "./Product.js";
/** Conditions:
 * ElectronicProduct 클래스는 Product를 상속하며, 
 * 추가로 manufacturer(제조사) 프로퍼티를 가집니다. 
 * The class ElectronicProduct inherit class Product,
 * and has a manufacturer property. */
export class ElectronicProducts extends Product {
  constructor(
    name, description, price, tags, images, favoriteCount, manufacturer
  ){
    super(name, description, price, tags, images, favoriteCount);
    this.manufacturer=manufacturer;
  }
}
