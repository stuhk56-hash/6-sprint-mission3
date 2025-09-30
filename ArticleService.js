import axios from 'axios';

// https://panda-market-api-crud.vercel.app/docs
const baseURL = `https://panda-market-api-crud.vercel.app`;

//-------------getArticleList(1,1,'')------------------------
export function getArticleList(page, pageSize, keyword) {
  const q = `?page=${page}&pageSize=${pageSize}&keyword=${keyword}`;
  const finURL = `${baseURL}/articles/${q}`;
  return axios
    .get(finURL)
    .then((response) => {
      console.log(`성공!`, response.data);
    })
    .catch((error) => {
      console.error('실패! :', error.message);
      if (error.response) {
        console.log(`실패 코드: ${error.response.status}`);
        console.log(error.response.data);
      }
    })
    .finally(() => {
      console.log('=====[gerArticleList] 테스트 완료=====');
    });
}

//------------getArticle(id)--------------------------------------

export function getArticle(id) {
  return axios
    .get(`${baseURL}/articles/${id}`)
    .then((response) => {
      console.log('성공! :', response.data);
      return response.data;
    })
    .catch((error) => {
      console.error('실패! :', error.message);
      if (error.response) {
        console.log(`실패 코드: ${error.response.status}`);
        console.log(error.response.data);
      }
    })
    .finally(() => {
      console.log('=====[gerArticle] 테스트 완료=====');
    });
}
//------------createArticle--------------------------------------

export function createArticle(articleData) {
  return axios
    .post(baseURL + '/articles', articleData)
    .then((response) => {
      return console.log(`성공!!:`, response.data);
    })
    .catch((error) => {
      console.error('실패!!!', error.message);
      if (error.response) {
        console.log(`실패 코드: ${error.response.status}`);
        console.log(`${error.response.data}`);
      }
    })
    .finally(() => {
      console.log(`===생성 실험 끝===`);
    });
}
//--------------------patchArticle------------------
export function patchArticle(id, articleData) {
  return axios
    .patch(`${baseURL}/articles/${id}`, articleData)
    .then((response) => {
      return console.log(`성공!!:`, response.data);
    })
    .catch((error) => {
      console.error(`실패!!!`, error.message);
      if (error.response) {
        console.log(`실패 코드: ${error.response.status}`);
        console.log(`${error.response.data}`);
      }
    })
    .finally(() => {
      console.log(`===패치 실험 끝===`);
    });
}

//-----------------deleteArticle----------------------
export function deleteArticle(id) {
  return axios
    .delete(`${baseURL}/articles/${id}`)
    .then((response) => {
      return console.log(`성공!!:`, response.data);
    })
    .catch((error) => {
      console.log(`실패 코드: ${error.response.status}`);
      console.log(`${error.response.data}`);
    })
    .finally(() => {
      console.log(`=== 게시물 삭제 실험 끝===`);
    });
}
