import axios from 'axios';
const URL = `${process.env.REACT_APP_API_BASE_URL}`;
const apikey = `${process.env.REACT_APP_API_KEY}`;

export function getAllCategoriesAPI(token, search_category) {
  return axios.get(`${URL}/categories?search_category=${search_category}`, {
    headers: {
      authorization: `Bearer ${token}`,
      apikey: apikey,
    },
  });
}
export function createCategory(token, data) {
  return axios.post(
    `${URL}/categories/`,
    { ...data },
    {
      headers: {
        authorization: `Bearer ${token}`,
        apikey: apikey,
      },
    },
  );
}

export function editCategory(token, data, id) {
  return axios.put(
    `${URL}/categories/${id}`,
    { ...data },
    {
      headers: {
        authorization: `Bearer ${token}`,
        apikey: apikey,
      },
    },
  );
}

export function deleteCategory(token, id) {
  return axios.delete(`${URL}/categories/${id}`, {
    headers: {
      authorization: `Bearer ${token}`,
      apikey: apikey,
    },
  });
}
