import axios from 'axios';
const URL = `${process.env.REACT_APP_API_BASE_URL}`;
const APIKey = `${process.env.REACT_APP_API_KEY}`;

export function getAllProductsAPI(data) {
  // console.log(data);
  return axios.get(`${URL}/products`, {
    params: {
      page: data?.page,
      limit: data?.limit,
      search: data?.search,
      category: data?.category,
      sortType: data?.sortType,
      sortOrder: data?.sortOrder,
    },
    headers: { apikey: APIKey },
  });
}

export function getProductDetailsAPI(data) {
  return axios.get(`${URL}/products/${data.id}`, {
    headers: { apikey: APIKey },
  });
}

export function getAllLabelsAPI(data) {
  return axios.get(`${URL}/labels`, {
    params: {
      page: data?.page,
      limit: data?.limit,
      search: data?.search,
      category: data?.category,
      sortType: data?.sortType,
      sortOrder: data?.sortOrder,
    },
    headers: { apikey: APIKey },
  });
}
