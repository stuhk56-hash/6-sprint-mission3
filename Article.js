// In JS, the class recommended to saved in each of js files.
//JS에서는 클래스를 각각 다른 파일에 저장해서 사용하길 권장한다.
/* Conditions:
class 키워드를 이용해서 Article 클래스를 만들어 주세요.
Article 클래스는 title(제목), content(내용), writer(작성자), likeCount(좋아요 수) 프로퍼티를 가집니다.
Article 클래스는 like method를 가집니다. like 메소드가 호출될 경우 좋아요 수가 1 증가합니다.
*/

class Article{
  constructor(title, content, writer, likeCount){
    this.title=title;
    this.content=content;
    this.writer=writer;
    this.likeCount=likeCount;
    this.createdAt=new Date();
  }
  like(){
    return this.likeCount++;
    //복합 할당 연산자(Compound assignment operators) 사용으로 코드 단순화 251010 7:13
  }
}