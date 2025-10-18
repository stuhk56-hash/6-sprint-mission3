const API_BASE_URL = 'https://panda-market-api-crud.vercel.app';

// GET 메소드 - 아티클 리스트 조회
export function getArticleList(page, pageSize, keyword) {
  const params = new URLSearchParams();
  if (page !== undefined) params.append('page', page);
  if (pageSize !== undefined) params.append('pageSize', pageSize);
  if (keyword !== undefined) params.append('keyword', keyword);
  
  const url = `${API_BASE_URL}/docs?${params.toString()}`;
  
  return fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .catch(error => {
      console.error('Error fetching article list:', error);
      throw error;
    });
}

export function getArticle(id) {
  return fetch(`${API_BASE_URL}/docs/${id}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .catch(error => {
      console.error('Error fetching article:', error);
      throw error;
    });
}

export function createArticle(title, content, image) {
  const requestBody = {
    title: title,
    content: content,
    image: image
  };

  return fetch(`${API_BASE_URL}/docs`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(requestBody)
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .catch(error => {
      console.error('Error creating article:', error);
      throw error;
    });
}

export function patchArticle(id, updates) {
  return fetch(`${API_BASE_URL}/docs/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(updates)
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .catch(error => {
      console.error('Error patching article:', error);
      throw error;
    });
}

export function deleteArticle(id) {
  return fetch(`${API_BASE_URL}/docs/${id}`, {
    method: 'DELETE'
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .catch(error => {
      console.error('Error deleting article:', error);
      throw error;
    });
}