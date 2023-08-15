import axios from 'axios';

const URL = `${process.env.REACT_APP_API_BASE_URL}`;
const apikey = `${process.env.REACT_APP_API_KEY}`;

export const getRevenueAPI = (token, params) => {
  return axios.get(`${URL}/tx-histories/revenue`, {
    params: { ...params },
    headers: {
      authorization: `Bearer ${token}`,
      apikey: apikey,
    },
  });
};

export const getTotalTransactionAPI = (token, params) => {
  return axios.get(`${URL}/tx-histories/total-transaction`, {
    params: { ...params },
    headers: {
      authorization: `Bearer ${token}`,
      apikey: apikey,
    },
  });
};

export const getTotalUserAPI = (token, params) => {
  return axios.get(`${URL}/tx-histories/total-user`, {
    params: { ...params },
    headers: {
      authorization: `Bearer ${token}`,
      apikey: apikey,
    },
  });
};

export const getTopSaleAPI = (token, params) => {
  return axios.get(`${URL}/tx-histories/top-sale`, {
    params: { ...params },
    headers: {
      authorization: `Bearer ${token}`,
      apikey: apikey,
    },
  });
};
