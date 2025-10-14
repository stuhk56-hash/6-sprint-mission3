// In JS, the class recommended in seperate js files.
//JS에서는 클래스를 각각 다른 파일에 저장해서 사용하길 권장한다.
//따라서 Product.js, ElectronicProduct.js를 만들어서 각 파일에
// 각 클래스를 옮겨왔다.
export class Product{
    constructor(name, description, price, tags, images, favoriteCount = 0){
        this.name= name;
        this.description=description;
        this.price= price;
        this.tags=tags;
        this.images=images;
        this.favoriteCount=favoriteCount;
    }

    /**Conditions:
     * Product class has the method 'favorite'.
     * When the favorite is called, the number of 'liked' increases by 1
     * Product 클래스는 favorite 메소드를 가집니다.
     * favorite 메소드가 호출될 경우 찜하기 수가 1 증가합니다.
     */
    // favorite이라는 이름을 가진 method 정의
    favorite(){
      return this.favoriteCount += 1;
      //복합할당연산자 사용해서 코드 단순하게 만듦.
    }
}