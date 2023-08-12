import axios from 'axios';
const URL = `${process.env.REACT_APP_API_BASE_URL}`;
const APIKey = `${process.env.REACT_APP_API_KEY}`;

export function getPromotionTypeAPI() {
  const token = localStorage.getItem('token');
  return axios.get(`${URL}/promotions/types`, {
    headers: {
      apiKey: APIKey,
      authorization: `Bearer ${token}`,
    },
  });
}

export function createPromotionAPI(values) {
  const token = localStorage.getItem('token');
  return axios.post(
    `${URL}/promotions/`,
    { data: values },
    {
      headers: {
        apiKey: APIKey,
        authorization: `Bearer ${token}`,
      },
    },
  );
}

export function getPromotionAPI(values) {
  const token = localStorage.getItem('token');
  return axios.get(`${URL}/promotions/list/`, {
    params: values,
    headers: {
      apiKey: APIKey,
      authorization: `Bearer ${token}`,
    },
  });
}
