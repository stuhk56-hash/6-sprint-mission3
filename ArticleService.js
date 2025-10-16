import { Article } from "./article.js";

//getArticleList()
export function getArticleList(page, pageSize, keyword = "") {
  const url = new URL("https://panda-market-api-crud.vercel.app/articles");
  url.searchParams.append("page", page);
  url.searchParams.append("pageSize", pageSize);
  url.searchParams.append("keyword", keyword);

  const res = fetch(url)
    .then((res) => {
      if (!res.ok) {
        throw new Error(`서버 응답 오류: ${res.status} `);
      }
      return res.json();
    })
    .then((data) => {
      console.log(data);
    })
    .catch((e) => {
      console.error(e);
    })
    .finally(() => {
      console.log("함수 종료");
    });
}

//getArticle()
export function getArticle(id) {
  fetch(`https://panda-market-api-crud.vercel.app/articles/${id}`)
    .then((res) => {
      if (!res.ok) {
        throw new Error(`서버 응답 오류: ${res.status} `);
      }
      return res.json();
    })
    .then((data) => {
      console.log(data);
    })
    .catch((e) => {
      console.error(e);
    })
    .finally(() => {
      console.log("함수 종료");
    });
}

//createArticle()
export function createArticle(title, content, image) {
  fetch("https://panda-market-api-crud.vercel.app/articles", {
    method: "POST",
    body: JSON.stringify({
      title: title,
      content: content,
      image: image,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error(`서버 응답 오류: ${res.status} `);
      }
      return res.json();
    })
    .then((data) => {
      console.log(data);
    })
    .catch((e) => {
      console.error(e);
    })
    .finally(() => {
      console.log("함수 종료");
    });
}

//patchArticle()
export function patchArticle(id, title, content, image) {
  fetch(`https://panda-market-api-crud.vercel.app/articles/${id}`, {
    method: "PATCH",
    body: JSON.stringify({
      title: title,
      content: content,
      image: image,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error(`서버 응답 오류: ${res.status} `);
      }
      return res.json();
    })
    .then((data) => {
      console.log(data);
    })
    .catch((e) => {
      console.error(e);
    })
    .finally(() => {
      console.log("함수 종료");
    });
}
//deleteArticle()
export function deleteArticle(id) {
  fetch(`https://panda-market-api-crud.vercel.app/articles/${id}`, {
    method: "DELETE",
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error(`서버 응답 오류: ${res.status} `);
      }
      return res.json();
    })
    .then((data) => {
      console.log(data);
    })
    .catch((e) => {
      console.error(e);
    })
    .finally(() => {
      console.log("함수 종료");
    });
}
