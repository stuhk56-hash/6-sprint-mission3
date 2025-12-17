// 1) any
// 타입스크립트 규칙을 무시하는 타입이다.
// 개발자가 타입 실수를 해도 TS는 아무 검사도 안한다.
// 웬만해서 쓰면 안되지만 전역 에러 핸들러나 특정 상황에서 사용이 가능하다. (어쩔 수 없이 쓰게 될 상황일 때- 최후의 수단)

let data: any = 'type';

console.log(data.toUpperCase());

data = 123;

console.log(data.toUpperCase());
// 메서드: toUpperCase -> 대문자 / toLowerCase -> 소문자

// 2) unknown
// 난 지금 네가 가진 값을 모르지만, 타입 확인하기 전까진 위험한 행동을 못하게 할거야!!
let value: unknown = 'type';

console.log('첫번째 값:', value);

value = 123;

console.log('두번째 값:', value);

console.log(value.toUpperCase());


// 3) 타입 좁히기
if(typeof value === 'string') {
    console.log(value.toUpperCase());
} else { 
    console.log('문자열이 아닙니다.');
}

// 3-1) 실제 예시
// DTO 검증, API 요청 처리, 쿼리+파싱 등 활용

/**
 * 3-2) 흐름 정리
 * 1. any는 타입 안정성을 파괴한다.
 * 2. unknown은 안전하지만 바로 쓰이지 못한다.
 * 3. 조건문으로 타입을 좁혀야한다. -> 검증 + 로직
 * 4. 좁혀진 영역에서는 string 메서드를 쓸 수 있다. -> DB 접근
 * 
 * 3-3) any vs known
 * any:
 * - 뭐든지 넣을 수 있다.
 * - 뭐든지 호출할 수 있다.
 * - ts가 침묵한다.
 * - 타입 안정성이 0이다.
 * - 결국 에러는 런타임에서 발생한다.
 * 
 * unknown:
 * - 뭐든지 넣을 수 있다.
 * - 그렇기 때문에 any 대신 쓰기 유용하다.
 * - 단, 아무렇게나 마음대로 못쓴다.(= ts가 못쓰게 막아줌)
 * - 타입을 좁혀야 사용가능하다.
 * - 실수 확률을 90%로 방지시켜준다.
 * - 실무 예시 : 
 * - 프론트에서 들어오는 req.body + json parse 결과 확인 시 사용
 * - API raw data 
 * - prisma raw query
 * - third party 라이브러리 응답
 */

// 4) 유니온 타입
// 허용된 타입만 받을 수 있고, 다른 타입은 차단된다.
let id: string | number = '42';

id = 42;

console.log(id); // number

id = true;

// 5) type vs interface
// 둘 다 객체 모양을 정의하는 타입이다. 단, 역할에서의 차이가 있다.

// 5-1) interface
interface Car {
    brand: string;
    year: number;
}

const myCar: Car {
    brand: '현대',
    year: 2025,
};

console.log(myCar);

/**
* 5-2) 그래서 왜 쓰는건데?
* 1. 인터페이스는 확장 설계형에 강하다.
* 2. 클래스 결합이 자연스럽다.
* 3. 확장/상속 늘리는 것이 자연스럽다.(코드 유연성)
* 4. 자동 merge(선언 병합)가 가능하다.
* 5. 모델이나 DTO에서 자주 사용되어진다.
**/

/**
* 5-3) Type
* 1. 정적 구조 + 복잡한 타입 조합에 강하다.
* 2. 유니온 타입 정의 가능하다.
* 3. 리터럴 타입, 함수 타입, 튜플, 복잡한 타입 설계에 강력하다.
* 4. 구조가 한 번 정해지면 고정적 (merge가 안됨)
* 5. 유틸 타입, 인터섹션 타입 등 여러 문법 타입이 있어 활용성이 높다.
**/

// 목표
// 1. ts.config 에서 nodenext를 왜 사용했는지?
// - 단순히 nodenext를 쓴 것 뿐 아니라 commonJS나 여러 모듈과 비교해서 질문하기
// 2. 폴더 구조 이해하기
// - 실제 폴더 구조의 작동 원리가 어떻게 되는지
// - 현업에서는 어떤 구조로 개발자들이 아키텍쳐를 구성하는지 
// - 폴더생성에 의도와 목적이 뭔지 거기에 들어가는 구성 기능들이 무엇인지?
// 3. ts 기초문법
// - 적어놓은 거 바탕으로 질문하고, 중간에 이해안가면 AI한테 쉽게 설명해달라고 요청
