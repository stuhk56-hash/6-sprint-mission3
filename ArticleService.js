const API_URL = 'https://panda-market-api-crud.vercel.app';

export function getArticleList({ page, pageSize, keyword }) {
  const params = new URLSearchParams({ page, pageSize, keyword});
  const url = `${API_URL}/articles/?${params}`;
  
  return fetch(url)
    .then(response => {
      if (!response.ok){
        console.error(`HTTP 오류 발생: ${response.status} (${response.statusText})`);
        throw new Error(`getArtiList Response failed: ${response.status} ${response.statusText}`);
      }
      return response.json(); //response를 json 형태로 바꿔서 받아온다.
    })
    .then(data => {
      return data; // data 반환
    })
    .catch(error => {
      console.error(`ArtiList API error `, error);
      throw error;
    });
}

export function getArticle(articleId){
  const url = `${API_URL}/articles/${articleId}`;
  return fetch(url)
    .then(response => {
      if (!response.ok){
        console.error(`HTTP error: ${response.status} (${response.statusText})`);
        throw new Error(`getArti request failed: ${response.status} ${response.statusText}`);
      }
      return response.json();
    })
    .then(data => {
      // console.log(data);
      return data;
    })
    .catch(error => {
      console.error('getArti API error: ', error);
    });
}

export function createArticle({title, content, image}) {
  const url = `${API_URL}/articles`;
  const newArticle = { title, content, image }; 

  return fetch(url, {
    method: 'POST', // HTTP 메소드를 POST로 지정
    headers: {
      'Content-Type': 'application/json', // 보내는 데이터 형식을 JSON으로 지정
    },
    body: JSON.stringify(newArticle) 
    // JavaScript 객체를 stringify 메소드를 통해 JSON 문자열로 변환
  })
   .then(res => {
    if(!res.ok) {
      console.error(`HTTP error: ${res.status} (${res.statusText})`);
      throw new Error(`createArti Failed request: ${res.status} ${res.statusText}`);
    }
    return res.json();
   })
   .then(data => {
    // console.log(data);
    return data;
   })
   .catch(error =>{
    console.error('createArti API error: ', error);
   });
}

export function patchArticle(articleId, updateData) {
  const url = `${API_URL}/articles/${articleId}`;

  return fetch(url, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(updateData)
  })
   .then(res => {
    if(!res.ok){
      throw new Error(`Failed request: ${res.status} ${res.statusText}`);
    }
    return res.json(); // 서버 응답을 JSON으로 파싱
   })
   .then(data => {
    return data;
   })
   .catch(error => {
    console.log('patchArti API error: ', error);
    return error;
    //main.js에서 호출자가 .catch()를 통해 오류를 처리하도록 에러를 다시 던진다.
   });
}

export function deleteArticle(articleId) {
  const url = `${API_URL}/articles/${articleId}`;

  return fetch(url, {
    method: 'DELETE'
  })
    .then(res => {
      if(!res.ok){
        throw new Error(`Failed request: ${res.status} (${res.statusText})`);
      }
      return res.json();
    })
    .then(data => {
      return data; // 서버가 반환한 성공 메시지나 객체 반환
    })
    .catch(error => {
      console.error(`deleteArti API `, error);
      throw error; //main.js에서 호출자가 .catch()를 통해 오류를 처리하도록 에러를 다시 던진다.
    });
}
