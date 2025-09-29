// const p1 = new Promise((resolve, reject) =>
//   setTimeout(() => resolve('첫 번째 완료'), 1000)
// );
// const p2 = new Promise(
//   (resolve, reject) => setTimeout(() => resolve('두 번째 완료'), 2000)
//   // setTimeout(() => reject("두 번째는 실패"), 2000)
// );
// const p3 = new Promise((resolve) =>
//   setTimeout(() => resolve('세 번째 완료'), 1500)
// );
console.time('실행시간');

const p1 = fetch('https://learn.codeit.kr/api/employees');
const p2 = fetch('https://learn.codeit.kr/api/employees');
const p3 = fetch('https://learn.codeit.kr/api/employees');

await Promise.all([p1, p2, p3])
  .then((results) => {
    console.log(results); // ["첫 번째 완료", "두 번째 완료", "세 번째 완료"]
  })
  .catch((error) => {
    console.error(error);
  });

console.timeEnd('실행시간');
