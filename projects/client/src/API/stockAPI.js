import axios from 'axios';
const URL = `${process.env.REACT_APP_API_BASE_URL}`;
const APIKey = `${process.env.REACT_APP_API_KEY}`;

export function getHistoryTypeAPI() {
  return axios.get(`${URL}/stocks/`, {
    headers: {
      apiKey: APIKey,
    },
  });
}

export function updateStockAPI(values, productId) {
  const token = localStorage.getItem('token');
  return axios.post(
    `${URL}/stocks/${productId}`,
    {
      data: values,
    },
    {
      headers: {
        apiKey: APIKey,
        authorization: `Bearer ${token}`,
      },
    },
  );
}
