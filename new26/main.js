// console.log(' =========== ');
// import axios from 'axios';

// const instance = axios.create({
//   baseURL: 'https://learn.codeit.kr/api',
//   timeout: 3000,
// });

// export async function getColorSurvey(queryParams = {}) {
//   const res = await instance.get(`color-survey`, {
//     parms: queryParams,
//   });
//   return res.data;
// }

// export async function createetColorSurvey(id) {
//   const res = await instance.get(`/color-survey/${id}`);
//   return res.data;
// }

// // const data = await getColorSurvey(221);
// // console.log(data);

// let res;
// const surveyData = {
//   mbti: 'ENFP',
//   colorCode: '#ABCDEF',
//   password: '0000',
// };

// try {
//   res = await createColorSurvey(surveyData);
// } catch (e) {
//   if (e.response) {
//     console.log(e.response.status); //상태코드
//     console.log(e.response.data);
//     throw new Error('생성 오류 발생');
//   } else if (e.request) {
//     console.log('리퀘스트는 전송되었으나 응답이 오지 않는 오류 발생');
//   } else {
//     console.log('그 외 오류');
//   }
// }

// console.log(' =========== ');
let like = 0;

export default class product {
  constructor(name, description, price, tags, images, favoriteCount) {
    this.name = name;
    this.description = description;
    this.price = price;
    this.tags = tags;
    this.images = images;
    this.favoriteCount = favoriteCount;
  }

  favorite() {
    like += 1;
  }
}
const myProduct = new product('노트북');
