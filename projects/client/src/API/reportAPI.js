import axios from 'axios';
const URL = `${process.env.REACT_APP_API_BASE_URL}`;
const APIKey = `${process.env.REACT_APP_API_KEY}`;

export function getStockHistoryAPI(values) {
  const token = localStorage.getItem('token');
  console.log(values);
  return axios.get(`${URL}/stock_histories`, {
    params: values,
    headers: { apikey: APIKey, authorization: `Bearer ${token}` },
  });
}
